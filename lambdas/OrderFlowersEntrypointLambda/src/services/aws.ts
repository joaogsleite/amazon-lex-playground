import dotenv from 'dotenv';
import aws from 'aws-sdk';
dotenv.config();

export const region = process.env.REGION;
export const accountId = process.env.ACCOUNT_ID;

export const translate = new aws.Translate({ region });
export const lexRuntime = new aws.LexRuntime({ region });