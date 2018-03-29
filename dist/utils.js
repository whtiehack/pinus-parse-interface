"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const main_1 = require("./main");
function parseAndWrite(sourcePath, distPath) {
    const result = main_1.parseToPinusProtobuf(sourcePath);
    return fs.writeFileSync(distPath, JSON.stringify(result, null, 4));
}
exports.parseAndWrite = parseAndWrite;
//# sourceMappingURL=utils.js.map