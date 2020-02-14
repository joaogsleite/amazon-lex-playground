#!/usr/bin/env bash
# =======================
# USAGE:
# ./deploy.sh INTENT_NAME
# =======================

# variables
source ../../.env
INTENT_NAME=$1


# validations
if [ -z "$INTENT_NAME" ]; then 
  echo "You must specify an INTENT_NAME as first argument"
  exit 1
fi


# deploy intent
aws lex-models put-intent \
  --region $REGION \
  --name $INTENT_NAME \
  --cli-input-json file://$INTENT_NAME.json \
  > /dev/null


# get deployed intent
aws lex-models get-intent \
  --region $REGION \
  --name $INTENT_NAME \
  --intent-version "\$LATEST" \
  > $INTENT_NAME-deployed.json


# delete unnecessary keys from deployed json
jq 'del(.lastUpdatedDate, .createdDate, .version)' \
  $INTENT_NAME-deployed.json > $INTENT_NAME.json
rm $INTENT_NAME-deployed.json