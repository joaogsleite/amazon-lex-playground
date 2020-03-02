import { lexRuntime } from './aws';
import { IContext } from '../types';
import { PostTextRequest } from 'aws-sdk/clients/lexruntime';

const botName = process.env.LEX_BOT_NAME || '';

export default function (context: IContext, inputText: string) {
  const params: PostTextRequest = {
    botAlias: '$LATEST',
    botName,
    inputText,
    userId: `${context.platform}-${context.userId}`,
  };
  return lexRuntime.postText(params).promise();
};