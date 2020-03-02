const { listFolders, listJsons } = require('.');
const { deleteLambda } = require('./lambda');
const { deleteSlot } = require('./slot');
const { deleteIntent } = require('./intent');
const { deleteBot } = require('./bot');
const { deleteApi } = require('./api');

const LAMBDAS = listFolders(__dirname, '..', 'lambdas');
const APIS = listJsons(__dirname, '..', 'api');
const BOTS = listJsons(__dirname, '..', 'lex', 'bots');
const INTENTS = listJsons(__dirname, '..', 'lex', 'intents');
const SLOTS = listJsons(__dirname, '..', 'lex', 'slots');

(async function (){

  for (const lambda of LAMBDAS) {
    await deleteLambda(lambda);
  }

  for (const bot of BOTS) {
    await deleteBot(bot);
  }

  for (const intent of INTENTS) {
    await deleteIntent(intent);
  }

  for (const slot of SLOTS) {
    await deleteSlot(slot);
  }

  for (const api of APIS) {
    await deleteApi(api);
  }
  
})();