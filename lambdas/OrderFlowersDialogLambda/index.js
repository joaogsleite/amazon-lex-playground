const { delegate } = require('./dialogActions');

function handleMessage(intent) {
  return delegate(intent);
}

exports.handler = async function (event) {
  const response = await handleMessage(event.currentIntent);
  return {
    dialogAction: response,
  };
};