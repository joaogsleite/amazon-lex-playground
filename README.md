# Amazon Lex Playground

Playground project to test the aws lex bot platform.

The project was created based on [this](https://docs.aws.amazon.com/lex/latest/dg/gs-cli.html) tutorial.


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
* scripts


## Usage

* Edit **json** files inside `lex/` sub-folders to edit *bot*, *intents* and *slots*
* Edit **js** files inside `lambdas/` folder to edit *validation* and *fulfillment* bot functions


## Deploy

* `npm run put:slot -- <slotName>`

* `npm run put:intent -- <intentName>`

* `npm run put:bot -- <botName>`


## Test

* `npm run test:bot -- <botName> <inputText>`
