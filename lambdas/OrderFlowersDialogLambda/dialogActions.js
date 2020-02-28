/**
 * Close an intent
 * @param {Intent} currentIntent
 * @param {Message} message
 * @param {'Fulfilled'|'Failed'} state
 */
exports.close = (currentIntent, message, state) => ({
  type: "Close",
  fulfillmentState: currentIntent ? state : 'Failed',
  message,
});

/**
 * Confirm an intent
 * @param {Intent} currentIntent
 * @param {Message} message
 * @param {string} [nextIntent]
 */
exports.confirmIntent = (currentIntent, message, nextIntent) => ({
  type: 'ConfirmIntent',
  intentName: nextIntent || currentIntent.intentName,
  slots: currentIntent.slots,
  message,
});

/**
 * Delegates the intent to Lex bot
 * @param {Intent} intent
 */
exports.delegate = (currentIntent) => ({
  type: 'Delegate',
  slots: currentIntent.slots,
});

/**
 * Rejects the intent
 * @param {Intent} currentIntent
 * @param {Message} message
 */
exports.elicitIntent = (currentIntent, message) => ({
  type: 'ElicitIntent',
  intentName: currentIntent.intentName,
  message,
});

/**
 * Rejects a slot
 * @param {Intent} currentIntent
 * @param {Message} message
 * @param {string} slotToElicit
 */
exports.elicitSlot = (currentIntent, message, slotToElicit) => ({
  type: 'ElicitSlot',
  intentName: currentIntent.intentName,
  slots: currentIntent.slots,
  slotToElicit,
  message,
});