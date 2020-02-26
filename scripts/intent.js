const fs = require('fs');
const path = require('path');
const { lex, lambda, region, accountId, sleep } = require('.');

function replaceLambdaURI(lambdaInfo) {
  if (!lambdaInfo) return;
  lambdaInfo.uri = lambdaInfo.uri.replace('REGION', region);
  lambdaInfo.uri = lambdaInfo.uri.replace('ACCOUNT_ID', accountId); 
}

async function addPermission(lambdaInfo) {
  if (!lambdaInfo) return;
  const lambdaName = lambdaInfo.uri.replace(`arn:aws:lambda:${region}:${accountId}:function:`, '');
  const permission = {
    Action: "lambda:InvokeFunction", 
    FunctionName: lambdaName,
    Principal: "lex.amazonaws.com", 
    StatementId: `${lambdaName}AmazonLex`,
  };
  console.log(`Adding permission for Intent to invoke lambda ${lambdaName}`);
  await lambda.addPermission(permission).promise().catch(() => undefined);
  console.log(`Permission for Intent to invoke lambda ${lambdaName} added.`);
  await sleep(1000);
}

async function deleteIntent(name) {
  console.log(`Deleting intent ${name}...`);
  await lex.deleteIntent({ name }).promise().catch(() => undefined);
  console.log(`Intent ${name} deleted.`);
}

async function putIntent(name){
  // get intent json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.json`),'utf-8'));
  replaceLambdaURI(data.fulfillmentActivity.codeHook);
  replaceLambdaURI(data.dialogCodeHook);

  // check if intent already exists
  const params = { name, version: '$LATEST' }
  const intent = await lex.getIntent(params).promise().catch(() => undefined);
  if (intent) {
    console.log(`Intent ${name} already exists. Reading checksum from last build...`);
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`),'utf-8');
    console.log(`Checksum from intent ${name} is ok.`);
  }

  // add permission for intent to call lambda function
  await addPermission(data.fulfillmentActivity.codeHook);
  await addPermission(data.dialogCodeHook);
  
  // upload intent and save to json
  console.log(`Uploading intent ${name}...`);
  const result = await lex.putIntent(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','intents',`${name}.checksum`), result.checksum, 'utf-8');
  console.log(`Intent ${name} uploaded.`);

}

module.exports = { putIntent, deleteIntent };
if (require.main === module) {
  putIntent(process.argv[2]);
}