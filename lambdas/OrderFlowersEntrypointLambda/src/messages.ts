import { IContext } from "./types";

import * as connectors from './connectors';
import translate from './services/translate';
import lexBot from './services/lex';

export async function receiveMsg(context: IContext, body: string) {
  const { text, language } = await translate(body);
  console.log(`Message received in ${language} translated to en: ${text}`);
  context.language = language;
  const response = await lexBot(context, text);
  if (response.message) {
    await sendMsg(context, response.message);
  }
};

async function sendMsg(context: IContext, body: string) {
  const { text } = await translate(body, context.language);
  console.log(`Response translated back to ${context.language}: ${body}`);
  await connectors.sendMsg(context, text);
};