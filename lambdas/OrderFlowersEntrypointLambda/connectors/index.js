// message controller
const messageController = require('../controllers/messages')

// connectors
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


/**
 * Receive message
 * @param {'messenger'} platform
 * @param {number} from
 * @param {string} body
 */
module.exports.receiveMsg = function (platform, from, body) {
  messageController.receiveMsg(platform, from, body);
};