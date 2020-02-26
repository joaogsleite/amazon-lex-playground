(async function (){

  const { deleteLambda } = require('./lambda');
  const { deleteSlot } = require('./slot');
  const { deleteIntent } = require('./intent');
  const { deleteBot } = require('./bot');
  const { deleteApi } = require('./api');
  
  let prefix = 'OrderFlowers';
  let suffix = '';

  suffix = 'Lambda';
  await deleteLambda(prefix + 'Dialog' + suffix);
  await deleteLambda(prefix + 'Fulfillment' + suffix, ['translate']);
  await deleteLambda(prefix + 'Entrypoint' + suffix);

  suffix = 'Bot';
  await deleteBot(prefix + '' + suffix);

  suffix = '';
  await deleteIntent(prefix + '' + suffix);

  suffix = '';
  await deleteSlot('FlowerTypes' + suffix);

  suffix = 'Api';
  await deleteApi(prefix + '' + suffix);
  
})();