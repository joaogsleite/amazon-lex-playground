require('dotenv').config();
const aws = require('aws-sdk');

const region = process.env.REGION;
const accountId = process.env.ACCOUNT_ID;

const lex = new aws.LexModelBuildingService({ region });
const lexRuntime = new aws.LexRuntime({ region });
const lambda = new aws.Lambda({ region });
const apigateway = new aws.APIGateway({ region });
const iam = new aws.IAM({ region });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { 
  apigateway,
  iam,
  lambda,
  lex,
  lexRuntime,
  region,
  accountId,
  sleep,
};