(async function (){

const { putLambda } = require('./lambda');
const { putSlot } = require('./slot');
const { putIntent } = require('./intent');
const { putBot } = require('./bot');
const { putApi } = require('./api');

await putLambda('OrderFlowersEntrypointLambda', ['translate','lex']);
await putLambda('OrderFlowersDialogLamda');
await putLambda('OrderFlowersFulfillmentLambda');

await putSlot('FlowerTypes');

await putIntent('OrderFlowers');
await putIntent('GiftPackage');

await putBot('OrderFlowers');

await putApi('OrderFlowersApi');

})();