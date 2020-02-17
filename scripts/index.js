require('dotenv').config();
const aws = require('aws-sdk');

const region = process.env.REGION;
const accountId = process.env.ACCOUNT_ID;

const lex = new aws.LexModelBuildingService({ region });
const lexRuntime = new aws.LexRuntime({ region });
const lambda = new aws.Lambda({ region });

module.exports = { 
  lex,
  lexRuntime,
  lambda,
  region,
  accountId,
};