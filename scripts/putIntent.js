const fs = require('fs');
const path = require('path');
const { lex, lambda, region, accountId } = require('.');

// get intent name from ARGS
const name = process.argv[2];

(async function(){
  
  // get intent json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.json`),'utf-8'));
  data.fulfillmentActivity.codeHook.uri = data.fulfillmentActivity.codeHook.uri.replace('REGION', region);
  data.fulfillmentActivity.codeHook.uri = data.fulfillmentActivity.codeHook.uri.replace('ACCOUNT_ID', accountId);

  // check if intent already exists
  const params = { name, version: '$LATEST' }
  const intent = await lex.getIntent(params).promise().catch(() => undefined);
  if (intent) {
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`),'utf-8');
  }

  // add permission for intent to call lambda function
  const lambdaName = data.fulfillmentActivity.codeHook.uri.replace(`arn:aws:lambda:${region}:${accountId}:function:`, '');
  const permission = {
    Action: "lambda:InvokeFunction", 
    FunctionName: lambdaName,
    Principal: "s3.amazonaws.com", 
    SourceAccount: accountId, 
    SourceArn: `arn:aws:lex:${region}:${accountId}:intent:${name}:*`, 
    StatementId: lambdaName,
  };
  await lambda.addPermission(permission).promise().catch(() => undefined);
  
  // upload intent and save to json
  const result = await lex.putIntent(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`), result.checksum, 'utf-8');

})();