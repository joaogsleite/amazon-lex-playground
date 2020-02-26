require('dotenv').config();
const aws = require('aws-sdk');

const region = process.env.REGION;
const accountId = process.env.ACCOUNT_ID;

const translate = new aws.Translate({ region });
const lexRuntime = new aws.LexRuntime({ region });

module.exports = { 
  region,
  accountId,
  translate,
  lexRuntime,
};