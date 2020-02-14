#!/usr/bin/env bash
# =================
# USAGE:
# ./deploy.sh
# =================

# variables
source ../../.env
BOT_NAME=OrderFlowersBot


# deploy bot to aws
aws lex-models put-bot \
  --region $REGION \
  --name $BOT_NAME \
  --cli-input-json file://$BOT_NAME.json \
  > /dev/null


# get deployed bot
aws lex-models get-bot \
  --region $REGION \
  --name OrderFlowersBot \
  --version-or-alias "\$LATEST" \
  > $BOT_NAME-deployed.json


# delete unnecessary keys from deployed json
jq 'del(.status, .lastUpdatedDate, .createdDate, .version)' \
  $BOT_NAME-deployed.json > $BOT_NAME.json
rm $BOT_NAME-deployed.json