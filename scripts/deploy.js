(async function (){

const putLambda = require('./putLambda');
const putSlot = require('./putSlot');
const putIntent = require('./putIntent');
const putBot = require('./putBot');
const putApi = require('./putApi');

let prefix = 'OrderFlowers';
let suffix = '';

suffix = 'Lambda';
await putLambda(prefix + 'Dialog' + suffix);
await putLambda(prefix + 'Fulfillment' + suffix);
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