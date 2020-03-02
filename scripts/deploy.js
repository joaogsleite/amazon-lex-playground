const { listJsons, listFolders } = require('.');
const { putLambda } = require('./lambda');
const { putSlot } = require('./slot');
const { putIntent } = require('./intent');
const { putBot } = require('./bot');
const { putApi } = require('./api');

const LAMBDAS = listFolders(__dirname, '..', 'lambdas');
const APIS = listJsons(__dirname, '..', 'api');
const BOTS = listJsons(__dirname, '..', 'lex', 'bots');
const INTENTS = listJsons(__dirname, '..', 'lex', 'intents');
const SLOTS = listJsons(__dirname, '..', 'lex', 'slots');

(async function (){

  for (const lambda of LAMBDAS) {
    await putLambda(lambda);
  }

  for (const slot of SLOTS) {
    await putSlot(slot);
  }

  for (const intent of INTENTS) {
    await putIntent(intent);
  }

  for (const bot of BOTS) {
    await putBot(bot);
  }

  for (const api of APIS) {
    await putApi(api);
  }

})();