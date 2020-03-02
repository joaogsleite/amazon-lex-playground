import { translate } from './aws';

const TERMINOLOGY_NAMES: string[] = [];

export default async function (text: string, to: string = 'en') {
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