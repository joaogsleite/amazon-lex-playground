const { lexRuntime } = require('.');

// get bot name and input text from ARGS
const name = process.argv[2];
const text = process.argv[3];

(async function(){
  
  const params = {
    botAlias: '$LATEST',
    botName: name,
    inputText: text,
    userId: 'ExampleUser1',
  }
  const result = await lexRuntime.postText(params).promise()
  console.log(result);

})();