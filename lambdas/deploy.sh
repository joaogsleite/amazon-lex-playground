#!/usr/bin/env bash

exit 1
## TODO!!!!!

CODE_FOLDER=$1
LAMBDA_NAME=$2

mkdir -p build/
zip -j -r build/$LAMBDA_NAME.zip lambdas/$CODE_FOLDER/*

aws lambda update-function-code \
  --function-name $LAMBDA_NAME \
  --zip-file fileb://build/$LAMBDA_NAME.zip \