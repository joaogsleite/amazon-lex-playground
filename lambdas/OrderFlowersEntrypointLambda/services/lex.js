const { lexRuntime } = require('./aws');

const botName = process.env.LEX_BOT_NAME;

module.exports = function (context, inputText) {
  const params = {
    botAlias: '$LATEST',
    botName,
    inputText,
    userId: `${context.platform}-${context.userId}`,
  }
  return lexRuntime.postText(params).promise()
};