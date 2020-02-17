const fs = require('fs');
const path = require('path');
const { lex } = require('.');

// get bot name from ARGS
const name = process.argv[2];

(async function(){
  
  // get intent json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','bots',`${name}.json`),'utf-8'));

  // check if intent already exists
  const params = { name, versionOrAlias: '$LATEST' }
  const bot = await lex.getBot(params).promise().catch(() => undefined);
  if (bot) {
    // if it exist: include checksum
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','bots',`${name}.checksum`),'utf-8');
  }
  
  // upload bot and save checksum
  const result = await lex.putBot(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','bots',`${name}.checksum`), result.checksum, 'utf-8');

})();