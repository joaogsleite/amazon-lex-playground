// connectors
import * as connectors from '../connectors';

// services
import translate from '../services/translate';
import lexBot, { fulfillContext } from '../services/lex';

// utils
import { mostUsedLanguage } from "../utils/context";
import { IContext, IMessage } from "../utils/types";
import { LexRuntime } from 'aws-sdk';

function generateMsg(result: LexRuntime.PostTextResponse): IMessage {
  const cards = result.responseCard && result.responseCard.genericAttachments;
  if (cards && cards.length > 0) {
    const messages = cards.map((card) => ({
      title: card.title,
      text: card.subTitle,
      url: card.attachmentLinkUrl,
      image: card.imageUrl,
      buttons: card.buttons,
    }));
    return messages.length === 1
      ? messages[0]
      : messages;
  } else {
    return { text: result.message };
  }
};

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
  if (context.languages[context.languages.length - 1] !== language) {
    context.languages = [...context.languages, language];
  }
  const result = await lexBot(context, text);
  const response = generateMsg(result);
  await sendMsg(context, response);
};

async function sendMsg(context: IContext, msg: IMessage) {
  const language = mostUsedLanguage(context);
  if (Array.isArray(msg)) {
    await connectors.sendMsg(context, msg);
  } else if (msg.text) {
    const { text } = await translate(msg.text, language);
    console.log(`Response translated back to ${language}: ${text}`);
    const translatedMsg = { ...msg };
    translatedMsg.text = text;
    await connectors.sendMsg(context, msg);
  }
};