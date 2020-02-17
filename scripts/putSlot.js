const fs = require('fs');
const path = require('path');
const { lex } = require('.');

// get slotType name from ARGS
const name = process.argv[2];

(async function(){
  
  // get slotType json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','slots',`${name}.json`),'utf-8'));

  // check if slotType already exists
  const params = { name, version: '$LATEST' }
  const slotType = await lex.getSlotType(params).promise().catch(() => undefined);
  if (slotType) {
    // if it exist: include checksum
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','slots',`${name}.checksum`),'utf-8');
  }
  
  // upload slotType and save checksum
  const result = await lex.putSlotType(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','slots',`${name}.checksum`), result.checksum, 'utf-8');

})();