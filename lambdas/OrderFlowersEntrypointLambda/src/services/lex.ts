// services
import { lexRuntime } from './aws';
import { PostTextRequest } from 'aws-sdk/clients/lexruntime';

// utils
import { toContext, toStringMap } from '../utils/context';
import { IContext, IMessage } from '../utils/types';
import LexRuntime = require('aws-sdk/clients/lexruntime');

const botName = process.env.LEX_BOT_NAME || '';

function parseMsg(result: LexRuntime.PostTextResponse): IMessage {
  const cards = result.responseCard && result.responseCard.genericAttachments;
  if (cards && cards.length > 0) {
    const messages: IMessage = cards.map((card) => ({
      title: card.title,
      text: card.subTitle,
      url: card.attachmentLinkUrl,
      image: card.imageUrl,
      buttons: card.buttons,
    }));
    if (result.message && messages[0].title) {
      messages.unshift({ text: result.message });
    }
    return messages.length === 1
      ? { ...messages[0], text: messages[0].text || result.message }
      : messages;
  } else {
    return { text: result.message };
  }
};

export async function fulfillContext(context: IContext): Promise<IContext> {
  const params = {
    botAlias: '$LATEST',
    botName,
    userId: `${context.platform}-${context.userId}`,
  };
  const session = await lexRuntime.getSession(params).promise().catch(console.log);
  if (session) {
    return {
      ...context,
      ...toContext(session.sessionAttributes || {}),
    }
  } else {
    return context;
  }
}

export default async function (context: IContext, inputText: string): Promise<{ message: IMessage, context: IContext}> {
  const params: PostTextRequest = {
    botAlias: '$LATEST',
    botName,
    inputText,
    userId: `${context.platform}-${context.userId}`,
    sessionAttributes: toStringMap(context),
  };
  const result = await lexRuntime.postText(params).promise();
  const message = parseMsg(result);
  const newContext = toContext(result.sessionAttributes || {});
  return {
    message,
    context: {
      ...context,
      ...newContext,
    },
  }
};