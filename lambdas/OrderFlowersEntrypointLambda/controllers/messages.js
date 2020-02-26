const connectors = require('../connectors');
const translate = require('../services/translate');
const lexBot = require('../services/lex');


/**
 * Receive message
 * @param {{context:'messenger',language:string, userId:number}} context
 * @param {number} userId
 * @param {string} body
 */
async function receiveMsg(context, body) {
  const { text, language } = await translate(body);
  console.log(`Message received in ${language} translated to en: ${text}`);
  context.language = language;
  const response = await lexBot(context, text);
  await sendMsg(context, response.message);
};


/**
 * Send message
 * @param {{context:'messenger',laguage:string, userId:number}} context
 * @param {string} body
 */
async function sendMsg(context, body) {
  const { text } = await translate(body, context.language);
  await connectors.sendMsg(context, text);
};


module.exports = {
  receiveMsg,
  sendMsg,
};