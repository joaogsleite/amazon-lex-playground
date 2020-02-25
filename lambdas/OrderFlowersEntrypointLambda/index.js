require('dotenv').config();
const { response } = require('./utils/api');

const listeners = []

/**
 * Add new event listener
 * @param {string} eventName
 * @param {(event: any) => Promise<any>} listener
 */
function addListener (name, func) {
  listeners.push({ name, func })
};


/**
 * Handler function for AWS Lambda function
 */
async function handler (event, context) {
  const eventName = event.path || event.resource;
  const { func } = listeners.find(({ name }) => {
    return eventName.includes(name);
  }) || {};
  if (func) {
    return await func(event, context);
  } else {
    return response({ error: 'Not found' }, 404);
  }
};


module.exports = {
  addListener,
  handler,
}


/* Import all platform connectors */
require('./connectors');