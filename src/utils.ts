
import * as fs from 'fs';
import {parseToPinusProtobuf} from "./main";

export function parseAndWrite(sourcePath:string,distPath:string){
    const result = parseToPinusProtobuf(sourcePath);
    return fs.writeFileSync(distPath,JSON.stringify(result,null,4));
}
