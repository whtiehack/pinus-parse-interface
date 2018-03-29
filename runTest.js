
require('ts-node/register');
const main = require('./src/main');

const test = main.parseToPinusProtobuf('./testInterface/server');
console.log('rest',JSON.stringify(test,null,4));
