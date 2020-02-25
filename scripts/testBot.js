const { lexRuntime } = require('.');

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

module.exports = testBot;
if (require.main === module) {
  const name = process.argv[2];
  const text = process.argv[3];
  putIntent(name, text);
}