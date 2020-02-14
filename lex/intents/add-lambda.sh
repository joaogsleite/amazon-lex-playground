#!/usr/bin/env bash

# variables
source ../../.env
INTENT_NAME=$1


# add-lambda
aws lambda add-permission \
  --region $REGION \
  --function-name $LAMBDA_VALIDATION \
  --statement-id $BOT_NAME \
  --action lambda:InvokeFunction \
  --principal lex.amazonaws.com \
  --source-arn "arn:aws:lex:$REGION:$ACCOUNT_ID:intent:$INTENT_NAME:*"