#!/usr/bin/env bash

BOT_NAME=OrderFlowersBot
MESSAGE=$1

aws lex-runtime post-text \
  --region eu-west-1 \
  --bot-name $BOT_NAME \
  --bot-alias "\$LATEST" \
  --user-id UserOne \
  --input-text "$MESSAGE"