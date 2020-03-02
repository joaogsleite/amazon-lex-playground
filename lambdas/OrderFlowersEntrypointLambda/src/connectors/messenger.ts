import { addListener } from '../index'
import { response } from '../services/apigateway';
import axios from 'axios';
import { receiveMsg } from '.';
import { IContext } from '../types';

const { FB_PAGE_TOKEN, FB_VERIFY_TOKEN } = process.env

export function sendMsg(context: IContext, message: string) {
  const body = {
    recipient: { id: context.userId },
    message: { text: message },
  };
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${FB_PAGE_TOKEN}`;
  return axios.post(url, body).catch(console.log);
};


addListener('/messenger/webhook', async function (event) {
  switch (event.httpMethod) {
    case 'GET':
      const query = event.queryStringParameters;
      if (query && query['hub.verify_token'] === FB_VERIFY_TOKEN && query['hub.mode'] === 'subscribe') {
        return response(query['hub.challenge']);
      } else {
        return response('WEBHOOK_NOT_VERIFIED', 403);
      }
    case 'POST':
    default:
      const body = JSON.parse(event.body);
      if (body.object === 'page') {
        for(const entry of body.entry) {
          const webhook_event = entry.messaging[0];
          const context: IContext = { 
            platform: 'messenger',
            userId: webhook_event.sender.id,
          };
          if (webhook_event.message) {
            await receiveMsg(context, webhook_event.message.text);
          } else if (webhook_event.postback) {
            await receiveMsg(context, webhook_event.postback);
          }
        };
        return response('EVENT_RECEIVED');
      } else {
        return response('ERROR', 404);
      }
  }
});