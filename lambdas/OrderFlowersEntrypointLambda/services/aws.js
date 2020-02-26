require('dotenv').config();
const aws = require('aws-sdk');

const region = process.env.REGION;
const accountId = process.env.ACCOUNT_ID;

const translate = new aws.Translate({ region });

module.exports = { 
  region,
  accountId,
  translate,
};