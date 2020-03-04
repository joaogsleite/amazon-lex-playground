// connectors
import * as connectors from '../connectors';

// services
import translate from '../services/translate';
import lexBot, { fulfillContext } from '../services/lex';

// utils
import { mostUsedLanguage } from "../utils/context";
import { IContext } from "../utils/types";

export async function receiveMsg(context: IContext, body: string) {
  console.log(`Message received: ${body}`);
  console.log(`Context before fulfill: ${JSON.stringify(context)}`);
  context = await fulfillContext(context);
  console.log(`Context after fulfill: ${JSON.stringify(context)}`);
  if (!context.profile) {
    context.profile = await connectors.getProfile(context);
    if (context.profile.locale) {
      context.languages.push(context.profile.locale);
    }
    console.log(`Context after profile fulfill: ${JSON.stringify(context)}`);
  }
  const { text, language } = await translate(body);
  console.log(`Message received in ${language} translated to en: ${text}`);
  if (context.languages[context.languages.length - 1] !== language) {
    context.languages = [...context.languages, language];
  }
  const response = await lexBot(context, text);
  if (response.message) {
    await sendMsg(context, response.message);
  }
};

async function sendMsg(context: IContext, body: string) {
  const language = mostUsedLanguage(context);
  const { text } = await translate(body, language);
  console.log(`Response translated back to ${language}: ${body}`);
  await connectors.sendMsg(context, text);
};