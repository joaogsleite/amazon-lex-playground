const fs = require('fs');
const path = require('path');
const { lambda, region, accountId } = require('.');

// get bot name from ARGS
const name = process.argv[2];

(async function(){

  const current = lambda.getFunction().promise().catch(() => undefined);
  if (current) {
    const params = {
      Code: {
      }, 
      Description: "", 
      FunctionName: "MyFunction", 
      Handler: "index.handler",
      MemorySize: 128, 
      Publish: true, 
      Role: `arn:aws:lex:${region}:${accountId}:intent:${intentName}:*`,
      Runtime: "nodejs8.10", 
      Timeout: 15
    };
    await lambda.createFunction(params).promise();
  } else {
    const params = {
      FunctionName: "myFunction", 
      Publish: true, 
      S3Bucket: "myBucket", 
      S3Key: "myKey", 
      S3ObjectVersion: "1", 
      ZipFile: '',
    };
    await lambda.updateFunctionCode(params).promise();
  }

})();