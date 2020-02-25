const path = require('path');
const fs = require('fs');
const sh = require('child_process').execSync;
const putRole = require('./putRole');
const { lambda } = require('.');

async function putLambda(name){

  sh(`
    cd lambdas/${name}
    cp ../../.env .
    npm install --no-package-lock
    zip -r ../../build/${name}.zip .
    rm .env
  `);

  const searchParams = {
    FunctionName: name,
  };
  const current = await lambda.getFunction(searchParams).promise().catch(() => undefined);
  if (current) {
    const params = {
      FunctionName: name, 
      Publish: true, 
      ZipFile: fs.readFileSync(path.join(__dirname, '..', 'build', name+'.zip')),
    };
    console.log(`Lambda function ${name} already exists. Just updating the code...`);
    await lambda.updateFunctionCode(params).promise();
    console.log(`Lambda function ${name} code updated.`);
  } else {
    const role = await putRole(name+'Role', 'lambda');
    const lambdaParams = {
      Code: {
        ZipFile: fs.readFileSync(path.join(__dirname, '..', 'build', name+'.zip')),
      }, 
      Description: "", 
      FunctionName: name, 
      Handler: "index.handler",
      MemorySize: 128, 
      Publish: true, 
      Role: role.Arn,
      Runtime: "nodejs12.x", 
      Timeout: 15,
    };
    console.log(`Creating lambda function ${name}...`);
    await lambda.createFunction(lambdaParams).promise();
    console.log(`Lambda function ${name} created.`);
  }
};

module.exports = putLambda;
if (require.main === module) {
  putLambda(process.argv[2]);
}