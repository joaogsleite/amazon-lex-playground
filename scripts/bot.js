const fs = require('fs');
const path = require('path');
const { lex } = require('.');

async function deleteBot(name) {
  console.log(`Deleting BOT ${name}...`);
  await lex.deleteBot({ name }).promise().catch(() => undefined);
  console.log(`BOT ${name} deleted.`);
}

async function putBot (name) {
  
  // get intent json
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,'..','lex','bots',`${name}.json`),'utf-8'));

  // check if intent already exists
  const params = { name, versionOrAlias: '$LATEST' }
  const bot = await lex.getBot(params).promise().catch(() => undefined);
  if (bot) {
    console.log(`Bot ${name} already exists. Reading checksum from last build...`);
    // if it exist: include checksum
    data.checksum = fs.readFileSync(path.join(__dirname,'..','lex','bots',`${name}.checksum`),'utf-8');
    console.log(`Checksum from bot ${name} is ok.`);
  }
  
  // upload bot and save checksum
  console.log(`Uploading bot ${name}...`);
  const result = await lex.putBot(data).promise();
  fs.writeFileSync(path.join(__dirname,'..','lex','bots',`${name}.checksum`), result.checksum, 'utf-8');
  console.log(`Bot ${name} uploaded.`);

}

async function testBot(name, text){
  const params = {
    botAlias: '$LATEST',
    botName: name,
    inputText: text,
    userId: 'ExampleUser1',
  }
  const result = await lexRuntime.postText(params).promise()
  console.log(result);
};

module.exports = { testBot, putBot, deleteBot };
if (require.main === module) {
  putBot(process.argv[2]);
}