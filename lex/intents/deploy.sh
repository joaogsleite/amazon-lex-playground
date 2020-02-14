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


# fulfill sensitive data (REGION & ACCOUNT_ID)
JSON=$(cat $INTENT_NAME.json)
JSON=${JSON//REGION/$REGION}
JSON=${JSON//ACCOUNT_ID/$ACCOUNT_ID}


# deploy intent
aws lex-models put-intent \
  --region $REGION \
  --name $INTENT_NAME \
  --cli-input-json "$JSON"


# get deployed intent
JSON=$(aws lex-models get-intent \
  --region $REGION \
  --name $INTENT_NAME \
  --intent-version "\$LATEST")


# hide sensitive data (REGION & ACCOUNT_ID)
JSON=${JSON//$REGION/REGION}
JSON=${JSON//$ACCOUNT_ID/ACCOUNT_ID}


# delete unnecessary keys from deployed json
echo $JSON | jq 'del(.lastUpdatedDate, .createdDate, .version)' \
  > $INTENT_NAME.json