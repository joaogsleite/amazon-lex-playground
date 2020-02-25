// message controller
const messageController = require('../controllers/messages')


/**
 * Receive message
 * @param {'messenger'} platform
 * @param {number} from
 * @param {string} body
 */
module.exports.receiveMsg = function (platform, from, body) {
  return messageController.receiveMsg(platform, from, body);
};


// platform connectors
const messenger = require('./messenger');


/**
 * Send message
 * @param {'messenger'} platform
 * @param {number} to
 * @param {string} body
 */
module.exports.sendMsg = function (platform, to, body) {
  switch(platform) {
    case 'messenger':
      return messenger.sendMsg(to, body);
  }
};