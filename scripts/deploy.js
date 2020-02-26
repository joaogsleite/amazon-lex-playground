(async function (){

const { putLambda } = require('./lambda');
const { putSlot } = require('./slot');
const { putIntent } = require('./intent');
const { putBot } = require('./bot');
const { putApi } = require('./api');

let prefix = 'OrderFlowers';
let suffix = '';

suffix = 'Lambda';
await putLambda(prefix + 'Dialog' + suffix);
await putLambda(prefix + 'Fulfillment' + suffix, ['translate']);
await putLambda(prefix + 'Entrypoint' + suffix);

suffix = '';
await putSlot('FlowerTypes' + suffix);

suffix = '';
await putIntent(prefix + '' + suffix);

suffix = 'Bot';
await putBot(prefix + '' + suffix);

suffix = 'Api';
await putApi(prefix + '' + suffix);

})();