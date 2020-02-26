const connectors = require('../connectors');
const translate = require('../services/translate');

function handleResponse(text) {
  if (text.includes('ello')) {
    return 'Hello!';
  } else if (text.includes('your name')) {
    return 'My name is Bot';
  } else {
    return 'I did not understand what you said. Please try again.';
  }
}


/**
 * Receive message
 * @param {{context:'messenger',language:string}} context
 * @param {number} userId
 * @param {string} body
 */
async function receiveMsg(context, userId, body) {
  const { text, language } = await translate(body);
  console.log(`Message received in ${language} translated to en: ${text}`);
  context.language = language;
  const response = handleResponse(text)
  await sendMsg(context, userId, response);
};


/**
 * Send message
 * @param {{context:'messenger',laguage:string}} context
 * @param {number} userId
 * @param {string} body
 */
async function sendMsg(context, userId, body) {
  const { text } = await translate(body, context.language);
  await connectors.sendMsg(context, userId, text);
};


module.exports = {
  receiveMsg,
  sendMsg,
};