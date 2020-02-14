# Amazon Lex Playground

Playground project to test the aws lex bot platform.

The project was created based on [this](https://docs.aws.amazon.com/lex/latest/dg/gs-cli.html) tutorial.


## Requirements

* AWS CLI

  The AWS Command Line Interface

  > You can dowload `aws` from [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

  > To configure your AWS CLI, run: `aws configure`

* jq

  Shell program to parse and edit json files

  > You can download `jq` from [here](https://stedolan.github.io/jq/)

## Project structure

* lex
  * bot
  * intents
  * slots
* lambdas
  * validation
  * fullfilment


## Usage

* Edit **json** files inside `lex/` sub-folders to edit *bot*, *intents* and *slots*
* Edit **js** files inside `lambdas/` folder to edit *validation* and *fulfillment* bot functions

## Deploy

Use `deploy.sh` inside each sub-project folder

* Example for *slot*

  ```bash
  cd lex/slot/
  ./deploy.sh "FlowerTypes"
  ```

* Example for *validation* lambda

  ```bash
  cd lambda/
  ./deploy.sh "validation"
  ```

## Test

Use `test.sh` inside `lex/bot/test.sh`

```bash
cd lex/bot/
./test.sh "I want to order some flowers"
```