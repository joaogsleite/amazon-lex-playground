// packages
import axios from 'axios';

// connector
import { receiveMsg } from '.';

// utils
import { IContext, IProfile, IMessage } from '../utils/types';
import { response } from '../utils/apigateway';
import { createContext } from '../utils/context';
import { addListener } from '../index';

const { FB_PAGE_TOKEN, FB_VERIFY_TOKEN } = process.env;
const URL = 'https://graph.facebook.com';

function parseMsg(message: IMessage) {
  const parseButtons = (btns: Array<{ text: string, value: string}>) => btns.map((btn) => ({
    // Button
    // https://developers.facebook.com/docs/messenger-platform/send-messages/buttons
    type: btn.value.startsWith('http') ? 'web_url' : 'postback',
    title: btn.text,
    payload: btn.value,
  }))
  const parseCards = () => ({
    // List Template
    // https://developers.facebook.com/docs/messenger-platform/reference/template/list
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: (Array.isArray(message) ? message : [message]).map((msg)=> ({
          title: msg.title,
          image_url: msg.image,
          subtitle: msg.text,
          buttons: msg.buttons && parseButtons(msg.buttons),
        })),
      }
    }
  })
  if (Array.isArray(message)) {
    return parseCards();
  } else {
    if (message.buttons && message.buttons.length > 0) {
      if (message.buttons.length > 3) {
        // Quick Replies
        // https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
        return {
          text: message.text,
          quick_replies: message.buttons.map((button) => ({
            content_type: 'text',
            title: button.text,
            payload: button.value,
          })),
        };
      } else if (message.title || message.image) {
        return parseCards()
      } else {
        // Buttons template
        // https://developers.facebook.com/docs/messenger-platform/reference/template/button
        return {
          attachment:{
            type: 'template',
            payload: {
              template_type: 'button',
              text: message.text,
              buttons: message.buttons && parseButtons(message.buttons),
            },
          },
        };
      }
    } else if (message.title || message.image) {
      return parseCards();
    } else {
      return { text: message.text };
    }
  }
};

export async function sendMsg(context: IContext, message: IMessage) {
  const url = `${URL}/v6.0/me/messages?access_token=${FB_PAGE_TOKEN}`;
  if (Array.isArray(message)) {
    if (message.length > 1 && message[0].text && !message[0].url && !message[0].buttons && !message[0].image && !message[0].title) {
      const first = message.shift();
      await axios.post(url, { recipient: { id: context.userId }, message: first });
    }
  }
  return await axios.post(url, { recipient: { id: context.userId }, message: parseMsg(message) });
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
            await receiveMsg(context, webhook_event.postback.payload);
          }
        };
        return response('EVENT_RECEIVED');
      } else {
        return response('ERROR', 404);
      }
  }
});