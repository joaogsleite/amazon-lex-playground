require('dotenv').config();
const path = require('path');
const fs = require('fs');

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

function listJsons(...paths) {
  return fs.readdirSync(path.join(...paths)).filter((name) => {
    return name.includes('.json') && !name.includes('.config.json');
  }).map((name) => {
    return name.replace('.json', '');
  });
}

function listFolders(...paths) {
  return fs.readdirSync(path.join(...paths));
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
  listJsons,
  listFolders,
};