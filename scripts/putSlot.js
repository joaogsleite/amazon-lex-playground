const fs = require('fs');
const path = require('path');
const { lex } = require('.');

async function putSlot(name) {
  
  // get slotType json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','slots',`${name}.json`),'utf-8'));

  // check if slotType already exists
  const params = { name, version: '$LATEST' }
  const slotType = await lex.getSlotType(params).promise().catch(() => undefined);
  if (slotType) {
    // if it exist: include checksum
    console.log(`Slot ${name} already exists. Reading checksum from last build...`);
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','slots',`${name}.checksum`),'utf-8');
    console.log(`Checksum from slot ${name} is ok.`);
  }
  
  // upload slotType and save checksum
  console.log(`Uploading slot ${name}...`);
  const result = await lex.putSlotType(data).promise();
  console.log(`Slot ${name} uploaded.`);
  fs.writeFileSync(path.join(__dirname,'..','lex','slots',`${name}.checksum`), result.checksum, 'utf-8');

};

module.exports = putSlot;
if (require.main === module) {
  putSlot(process.argv[2]);
}