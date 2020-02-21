const fs = require('fs');
const path = require('path');
const { lex, lambda, region, accountId } = require('.');

// get intent name from ARGS
const name = process.argv[2];

function replaceLambdaURI(lambdaInfo) {
  lambdaInfo.uri = lambdaInfo.uri.replace('REGION', region);
  lambdaInfo.uri = lambdaInfo.uri.replace('ACCOUNT_ID', accountId); 
}

async function addPermission(lambdaInfo) {
  const lambdaName = lambdaInfo.uri.replace(`arn:aws:lambda:${region}:${accountId}:function:`, '');
  const permission = {
    Action: "lambda:InvokeFunction", 
    FunctionName: lambdaName,
    Principal: "lex.amazonaws.com", 
    SourceAccount: accountId, 
    SourceArn: `arn:aws:lex:${region}:${accountId}:intent:${name}:*`, 
    StatementId: `${lambdaName}AmazonLex`,
  };
  await lambda.addPermission(permission).promise().catch(console.log);
}

(async function(){
  
  // get intent json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.json`),'utf-8'));
  replaceLambdaURI(data.fulfillmentActivity.codeHook);
  //replaceLambdaURI(data.dialogCodeHook);

  // check if intent already exists
  const params = { name, version: '$LATEST' }
  const intent = await lex.getIntent(params).promise().catch(() => undefined);
  if (intent) {
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`),'utf-8');
  }

  // add permission for intent to call lambda function
  await addPermission(data.fulfillmentActivity.codeHook);
  //await addPermission(data.dialogCodeHook);
  
  // upload intent and save to json
  const result = await lex.putIntent(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`), result.checksum, 'utf-8');

})();