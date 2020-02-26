# Amazon Lex Playground

Playground project to test the aws lex bot platform.


## Requirements

* node 12

## Project structure

* lex
  * bot
  * intents
  * slots
* lambdas
  * validation
  * fullfilment
* api
* scripts


```
                             Amazon Translate
                                    ^
                                    |
Facebook --> API Gateway --> EntrypointLambda --> Amazon Lex BOT
                                                        |
                                                        V
                                  DialogLambda  <-->  Intent  <-->  FulfillmentLambda
```


## Usage

* Edit **json** files inside `lex/` sub-folders to edit *bot*, *intents* and *slots*
* Edit **js** files inside `lambdas/` folder to edit *validation* and *fulfillment* bot functions
* Edit **json** files inside `api/` folder to edit api gateway configurations


## Scripts available

* `npm run put:lambda -- <lambdaName>`

* `npm run put:slot -- <slotName>`

* `npm run put:intent -- <intentName>`

* `npm run put:bot -- <botName>`

* `npm run put:api -- <apiGatewayName>`


## Deploy

* Edit `scripts/deploy.js` file

* Run `npm run deploy`


## Test

* `npm run test:bot -- <botName> <inputText>`


## Platforms

### Facebook

* Test accounts: [whitehat](https://www.facebook.com/whitehat/accounts/)