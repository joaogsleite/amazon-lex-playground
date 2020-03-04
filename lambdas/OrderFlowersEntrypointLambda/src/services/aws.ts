import aws from 'aws-sdk';

// strings
export const region = process.env.REGION;
export const accountId = process.env.ACCOUNT_ID;

// services
export const translate = new aws.Translate({ region });
export const lexRuntime = new aws.LexRuntime({ region });