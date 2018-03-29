
require('ts-node/register');
const main = require('./src/');

let test = main.parseToPinusProtobuf('./testInterface/server');
console.log('result',JSON.stringify(test,null,4));

main.parseAndWrite('./testInterface/server','./tmp.json');

