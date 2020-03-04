// packages
import axios from 'axios';

// connector
import { receiveMsg } from '.';

// utils
import { IContext, IProfile } from '../utils/types';
import { response } from '../utils/apigateway';
import { createContext } from '../utils/context';
import { addListener } from '../index';

const { FB_PAGE_TOKEN, FB_VERIFY_TOKEN } = process.env;
const URL = 'https://graph.facebook.com';

export function sendMsg(context: IContext, message: string) {
  const body = {
    recipient: { id: context.userId },
    message: { text: message },
  };
  const url = `${URL}/v6.0/me/messages?access_token=${FB_PAGE_TOKEN}`;
  return axios.post(url, body).catch(console.log);
};

export async function getProfile(context: IContext): Promise<IProfile> {
  const fields = [
    'first_name',
    'last_name',
    'locale',
    'timezone',
  ].join(',');
  const { data } = await axios.get(`${URL}/${context.userId}?fields=${fields}&access_token=${FB_PAGE_TOKEN}`);
  return {
    name: data.first_name + ' ' + data.last_name,
    gender: data.gender,
    locale: (data.locale as string || '').substring(0,2),
    timezone: data.timezone,
  };
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
          const context = createContext({
            platform: 'messenger',
            userId: webhook_event.sender.id,
          })
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