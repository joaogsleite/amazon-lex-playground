exports.handler = function (event, context, callback) {
  const response = {
    sessionAttributes: event.sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState: 'Fulfilled',
      message: { 
        contentType: 'PlainText',
        content: `Example response`,
      },
    },
  };
  callback(response);
}