# Amazon Lex Playground

Playground project to test the aws lex bot platform.


## Architecture

### Requirements

* [NodeJS 12.5.X](https://nodejs.org/en/)
* [AWS CLI 1.16.X](https://aws.amazon.com/cli/)


### Folder structure

* lex
  * bot
  * intents
  * slots
* lambdas
  * validation
  * fullfilment
* api
* scripts


### Infrastructure

```
                                   AWSTranslate
                                        ^
                                        |
                                        V
   Platforms --> API Gateway --> EntrypointLambda --> AWSLexBOT
(ex: messenger)                         ||               |
                                    connectors           |
                                                         |
                                                         V
                                   DialogLambda  <-->  Intent  <-->  FulfillmentLambda
                                                         ||
                                                      slotTypes
```


### Platform connectors

* Facebook

  > [Test accounts](https://www.facebook.com/whitehat/accounts/)


## Usage

* Edit **json** files inside `lex/` sub-folders to edit *bot*, *intents* and *slots*
* Edit **js** files inside `lambdas/` folder to edit *validation* and *fulfillment* bot functions
* Edit **json** files inside `api/` folder to edit api gateway configurations


### Scripts available

* `npm run put:lambda -- <lambdaName>`

* `npm run put:slot -- <slotName>`

* `npm run put:intent -- <intentName>`

* `npm run put:bot -- <botName>`

* `npm run put:api -- <apiGatewayName>`

* `npm run put:role -- <roleName> <AWSService> [<AWSPolicy1> <AWSPolicy2> ... <AWSPolicyN>]`


### Deploy

* Edit `scripts/deploy.js` file

* Run `npm run deploy`


### Test

* `npm run test:bot -- <botName> <inputText>`


## AWS

### Resource

Amazon Resource Name (ARN): `arn:aws:SERVICE:REGION:ACCOUND_ID:RESOURCE_PATH/RESOURCE_ID`

**ARN string examples**:

* Lambda function: `arn:aws:lambda:eu-west-1:123456789:function:OrderFlowersEntrypointLambda`
* API Gateway: `arn:aws:apigateway:eu-west-1:123456789:1234567`
* Policy: `arn:aws:iam::aws:policy/AWSLambdaExecute`
* Role: `arn:aws:iam::123456789:role/myRoleName`


### Role

An IAM role is an IAM identity that you can create in your account that has specific permissions.

You can use roles to delegate access to users, applications, or services that don't normally have access to your AWS resources.


### Policy

You manage access in AWS by creating policies and attaching them to IAM identities (Users or Roles) or AWS resources (Lambdas, API Gateways, ...)

**Policy JSON example**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:*"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::*"
    }
  ]
}
```
