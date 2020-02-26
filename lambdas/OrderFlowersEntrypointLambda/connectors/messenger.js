const { addListener } = require('../index');
const { response } = require('../utils/api');
const axios = require('axios');
const { receiveMsg } = require('.');

const { FB_PAGE_TOKEN, FB_VERIFY_TOKEN } = process.env


/**
 * Send facebook messenger message
 * @param {number} to - Page-scoped ID
 * @param {any} message - Message body
 * @param {'RESPONSE'|'UPDATE'|'MESSAGE_TAG'} type - Message type
 */
module.exports.sendMsg = function (to, message, type = 'RESPONSE') {
  const body = {
    messaging_type: type,
    recipient: { id: to },
    message,
  };
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${FB_PAGE_TOKEN}`;
  return axios.post(url, body);
};


addListener('/messenger/webhook', async function (event) {
  switch (event.httpMethod) {
    case 'GET':
      const query = event.queryStringParameters
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
          let webhook_event = entry.messaging[0];
          let sender_psid = webhook_event.sender.id;
          if (webhook_event.message) {
            await receiveMsg('messenger', sender_psid, webhook_event.message.text);
          } else if (webhook_event.postback) {
            await receiveMsg('messenger', sender_psid, webhook_event.postback);
          }
        };
        return response('EVENT_RECEIVED');
      } else {
        res.sendStatus(404);
        return response('ERROR', 404);
      }
     
      
  }
});