
require('ts-node/register');
const main = require('./src/');

let test = main.parseToPinusProtobuf('./testInterface/client');
console.log('client result',JSON.stringify(test,null,4));


test = main.parseToPinusProtobuf('./testInterface/server');
console.log('server result',JSON.stringify(test,null,4));

main.parseAndWrite('./testInterface/server','./tmp.json');

