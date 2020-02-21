const path = require('path');
const fs = require('fs');
const sh = require('child_process').execSync;
const { lambda, accountId } = require('.');

// get bot name from ARGS
const name = process.argv[2];

(async function(){

  sh(`cd lambdas/${name} && zip -r ../../build/${name}.zip .`)

  const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'lambdas', name, 'package.json')));

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
    await lambda.updateFunctionCode(params).promise();
  } else {
    const params = {
      Code: {
        ZipFile: fs.readFileSync(path.join(__dirname, '..', 'build', name+'.zip')),
      }, 
      Description: "", 
      FunctionName: name, 
      Handler: "index.handler",
      MemorySize: 128, 
      Publish: true, 
      Role: packageJSON.config['aws:role'].replace('ACCOUNT_ID', accountId),
      Runtime: "nodejs12.x", 
      Timeout: 15,
    };
    await lambda.createFunction(params).promise();
  }

})();