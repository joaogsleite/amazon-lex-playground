const fs = require('fs');
const path = require('path');
const { apigateway, region, accountId, sleep, lambda } = require('.');

function replaceURIs(body) {
  body = body.replace('REGION', region);
  body = body.replace('REGION', region);
  body = body.replace('ACCOUNT_ID', accountId);
  return body 
}

async function addPersmissionToInvokeLambda(data) {
  const lambdaName = data.split(':function:')[1].split('/invocations"')[0];
  const permission = {
    Action: "lambda:InvokeFunction", 
    FunctionName: lambdaName,
    Principal: "apigateway.amazonaws.com", 
    StatementId: `${lambdaName}AmazonApiGateway`,
  };
  console.log(`Adding permission for API Gateway to invoke lambda ${lambdaName}`);
  await lambda.addPermission(permission).promise().catch(() => undefined);
  console.log(`Permission for API Gateway to invoke lambda ${lambdaName} added.`);
  await sleep(3000);
}

async function deleteApi(name) {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname,'..','api',`${name}.config.json`),'utf-8'));
  console.log(`Deleting API Gateway ${name}...`);
  await apigateway.deleteRestApi({restApiId: config.id}).promise().catch(() => undefined);
  console.log(`API Gateway ${name} deleted.`);
}

async function putApi(name) {

  const config = JSON.parse(fs.readFileSync(path.join(__dirname,'..','api',`${name}.config.json`),'utf-8'));
  let result = await apigateway.getRestApi({ restApiId: config.id }).promise().catch(() => undefined);
  
  if (!result) {
    delete config.id;
    console.log(`Creating API Gateway ${name}...`);
    result = await apigateway.createRestApi({ name, ...config }).promise();
    console.log(`API Gateway ${name} created.`);
    if (result) {
      config.id = result.id;
      console.log(`Uploading API Gateway ${name} config json file...`);
      fs.writeFileSync(
        path.join(__dirname, '..', 'api', `${name}.config.json`),
        JSON.stringify(config, null, 2),
        'utf-8',
      );
      console.log(`API Gateway ${name} config json file updated.`);
    }
  }

  let body = fs.readFileSync(path.join(__dirname,'..','api',`${name}.json`),'utf-8');
  body = replaceURIs(body);
  await addPersmissionToInvokeLambda(body);
  
  const params = {
    parameters: {
      endpointConfigurationTypes: 'REGIONAL',
      ignore: 'documentation',
    },
    restApiId: config.id,
    body,
  }
  console.log(`Updating API Gateway ${name} REST config...`);
  await apigateway.putRestApi(params).promise();
  console.log(`API Gateway ${name} REST config updated.`);
};

module.exports = { deleteApi, putApi };
if (require.main === module) {
  putApi(process.argv[2]);
}