// connectors
import * as connectors from '../connectors';

// services
import translate from '../services/translate';
import lexBot, { fulfillContext } from '../services/lex';

// utils
import { mostUsedLanguage } from "../utils/context";
import { IContext, IMessage } from "../utils/types";

export async function receiveMsg(context: IContext, receivedMsg: string) {
  console.log(`Message received: ${receivedMsg}`);
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
  const { text, language } = await translate(receivedMsg);
  console.log(`Message received in ${language} translated to en: ${text}`);
  context.languages = [...context.languages, language];
  const { message: responseMsg, context: newContext } = await lexBot(context, text);
  await sendMsg(newContext, responseMsg);
};

async function sendMsg(context: IContext, msg: IMessage) {
  console.log(`Message to be sent: ${JSON.stringify(msg)}`);
  if (Array.isArray(msg)) {
    await connectors.sendMsg(context, msg);
  } else if (msg.text) {
    const language = mostUsedLanguage(context);
    console.log(`Most used language: ${language}`);
    const { text } = await translate(msg.text, language);
    console.log(`Response translated back to ${language}: ${text}`);
    const translatedMsg = { ...msg };
    translatedMsg.text = text;
    await connectors.sendMsg(context, translatedMsg);
  }
};