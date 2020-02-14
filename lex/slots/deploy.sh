#!/usr/bin/env bash
# =====================
# USAGE:
# ./deploy.sh SLOT_NAME
# =====================

# variables
source ../../.env
SLOT_NAME=$1


# validations
if [ -z "$SLOT_NAME" ]; then 
  echo "You must specify a SLOT_NAME as first argument"
  exit 1
fi


# deploy slot-type
aws lex-models put-slot-type \
    --region $REGION \
    --name $SLOT_NAME \
    --cli-input-json file://$SLOT_NAME.json \
    > /dev/null


# get deployed slot-type
aws lex-models get-slot-type \
  --region $REGION \
  --name $SLOT_NAME \
  --slot-type-version "\$LATEST" \
  > $SLOT_NAME-deployed.json


# delete unnecessary keys from deployed json
jq 'del(.lastUpdatedDate, .createdDate, .version)' \
  $SLOT_NAME-deployed.json > $SLOT_NAME.json
rm $SLOT_NAME-deployed.json