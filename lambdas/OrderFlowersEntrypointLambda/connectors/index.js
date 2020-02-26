// message controller
const messageController = require('../controllers/messages')


/**
 * Receive message
 * @param {{ platform:'messenger', language: string }} context
 * @param {number} from
 * @param {string} body
 */
module.exports.receiveMsg = function (context, from, body) {
  context = typeof context === 'string'
    ? { platform: context }
    : context;
  return messageController.receiveMsg(context, from, body);
};


// platform connectors
const messenger = require('./messenger');


/**
 * Send message
 * @param {{ platform:'messenger', language: string } context
 * @param {number} to
 * @param {string} body
 */
module.exports.sendMsg = function (context, to, body) {
  switch(context.platform) {
    case 'messenger':
      return messenger.sendMsg(to, body);
  }
};