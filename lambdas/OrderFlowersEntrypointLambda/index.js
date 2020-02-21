const AWS = require('aws-sdk');

const TERMINOLOGY_NAMES = [];

exports.handler = async function (event) {
  const translateService = new AWS.Translate();
  const text = 'Olá mundo!';
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'en',
    Text: text,
    TerminologyNames: TERMINOLOGY_NAMES,
  };
  const result = await translateService.translateText(params).promise();
  console.log('result', result);
}