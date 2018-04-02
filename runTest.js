
require('ts-node/register');
const main = require('./src/');



let test = main.parseToPinusProtobuf('./testInterface');
console.log('server result',JSON.stringify(test,null,4));

main.parseAndWrite('./testInterface','./tmp.json');

