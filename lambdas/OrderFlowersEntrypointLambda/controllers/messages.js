const connectors = require('../connectors');


/**
 * Receive message
 * @param {'messenger'} platform
 * @param {number} userId
 * @param {string} body
 */
async function receiveMsg(platform, userId, body) {
  // example echo bot
  //return sendMsg(platform, userId, body);
  console.log(`Message received on ${platform} from ${userId}: ${body}`);
};


/**
 * Send message
 * @param {'messenger'} platform
 * @param {number} userId
 * @param {string} body
 */
function sendMsg(platform, userId, body) {
  return connectors.sendMsg(platform, userId, body);
};


module.exports = {
  receiveMsg,
  sendMsg,
};