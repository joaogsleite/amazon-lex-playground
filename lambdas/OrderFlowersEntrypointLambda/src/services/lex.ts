// services
import { lexRuntime } from './aws';
import { PostTextRequest } from 'aws-sdk/clients/lexruntime';

// utils
import { toContext, toStringMap } from '../utils/context';
import { IContext } from '../utils/types';

const botName = process.env.LEX_BOT_NAME || '';

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

export default function (context: IContext, inputText: string) {
  const params: PostTextRequest = {
    botAlias: '$LATEST',
    botName,
    inputText,
    userId: `${context.platform}-${context.userId}`,
    sessionAttributes: toStringMap(context),
  };
  return lexRuntime.postText(params).promise();
};