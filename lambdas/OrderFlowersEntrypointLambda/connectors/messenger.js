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
        return response('WEBHOOK_VERIFIED');
      } else {
        return response('WEBHOOK_NOT_VERIFIED', 403);
      }
    case 'POST':
    default:
      const body = JSON.parse(event.body);
      await receiveMsg('messenger', body.sender.id, body.message.text);
      return response('EVENT_RECEIVED');
  }
});