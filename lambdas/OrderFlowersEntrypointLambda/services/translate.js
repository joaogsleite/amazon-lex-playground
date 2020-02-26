const { translate } = require('./aws');

const TERMINOLOGY_NAMES = [];

module.exports = async function (text, to = 'en') {
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: to,
    Text: text,
    TerminologyNames: TERMINOLOGY_NAMES,
  };
  const result = await translate.translateText(params).promise();
  return {
    text: result.TranslatedText,
    language: result.SourceLanguageCode,
  };
};