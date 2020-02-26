// message controller
const messageController = require('../controllers/messages')


/**
 * Receive message
 * @param {{ platform:'messenger', language: string }} context
 * @param {number} from
 * @param {string} body
 */
module.exports.receiveMsg = function (context, body) {
  return messageController.receiveMsg(context, body);
};


// platform connectors
const messenger = require('./messenger');


/**
 * Send message
 * @param {{ platform:'messenger', language: string } context
 * @param {number} to
 * @param {string} body
 */
module.exports.sendMsg = function (context, body) {
  switch(context.platform) {
    case 'messenger':
      return messenger.sendMsg(context, body);
  }
};