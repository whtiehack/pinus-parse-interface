

import {resolve} from 'path';
import * as TJS from "typescript-json-schema";
import * as fs from 'fs';
import {Definition} from "typescript-json-schema";
import * as util from 'util';
import * as path from 'path';
import {JsonSchemaGenerator} from "typescript-json-schema";

function log(...args){
    console.log(...args);
}

function error(msg,...args){
    const str = util.format(msg,...args);
    console.error(str);
    throw new Error(str);
}

let responseStr = '_Res';
let requestStr = '_Req';

export function parseToPinusProtobuf(baseDir:string,reqStr='_Req',resStr='_Res'): {client:object,server:object}{
    responseStr = resStr;
    requestStr = reqStr;
    let retObj = {client:{},server:{}};
    const files = fs.readdirSync(baseDir);
    const tsFilePaths:string[] = [];
    files.forEach(val=>{
        if(!val.endsWith('.ts')){
            return;
        }
        tsFilePaths.push(resolve(baseDir+'/'+val));
        // const obj = parseFile(baseDir,val);
        // const tmp = path.parse(val);
        // retObj.client[tmp.name] = obj.client;
        // retObj.server[tmp.name] = obj.server;
    });

    // optionally pass argument to schema generator
    const settings: TJS.PartialArgs = {
        required: true
    };

// optionally pass ts compiler options
    const compilerOptions: TJS.CompilerOptions = {
        strictNullChecks: true
    };
    const program = TJS.getProgramFromFiles(tsFilePaths, compilerOptions, baseDir);
    const generator = TJS.buildGenerator(program, settings);
    // all symbols

    const symbols = generator.getMainFileSymbols(program);
    files.forEach(val=>{
        if(!val.endsWith('.ts')){
            return;
        }
        const obj = parseFile(baseDir,val,program,generator,symbols);
        const tmp = path.parse(val);
        retObj.client[tmp.name] = obj.client;
        retObj.server[tmp.name] = obj.server;
    });
    return retObj;
}

function parseFile(baseDir:string,filename:string,program:TJS.Program,generator:JsonSchemaGenerator,symbols:string[]){
    if(!symbols || !symbols.length){
        return;
    }
    const filePath = path.parse(filename);
    filename = filePath.name.replace(/\./g,'_');
    // const symbolName = symbols[symbols.length-1];
    // if(!symbolName){
    //     return;
    // }

    let  symbolClient;
    if(symbols.includes(filename+requestStr)){
        symbolClient = generator.getSchemaForSymbol(filename+requestStr);
    }
    let client;
    let server;
    if(symbolClient){
        const messages = {};
        client =  parseSymbol(symbolClient,symbolClient,messages);
    }
    let symbolServer;
    if(symbols.includes(filename+responseStr)){
        if(!client){
            console.warn('WARNING:',filename,`has ${responseStr} without ${requestStr}`);
        }
        symbolServer = generator.getSchemaForSymbol(filename+responseStr);
    }
    if(!symbolServer){
        if(client){
         //   console.warn('WARNING:',filename,`has ${requestStr} without ${responseStr}`);
        }
        if(symbols.includes(filename)){
            symbolServer = generator.getSchemaForSymbol(filename);
        }
    }
    if(!symbolServer){
        return {client:client};
    }
    const messages = {};
    server =  parseSymbol(symbolServer,symbolServer,messages);
    return {client:client,server:server};
 //   return transMessage(obj,messages);
}



interface IProp{
    $ref?:string;
    type?:string;
    additionalProperties?:string;
    items:{type?:string;$ref?:string};
}

const PROTOBUF_TYPES = [
    "uInt32",
    "sInt32",
    "int32" ,
    "double",
    "string",
    "message",
    "float"
];
function getDefinitionFromRoot(root:Definition,ref:string):Definition{
    // "#/definitions/MyRank"
    let name:string = ref.split('/') as any;
    name = name[name.length-1];
    const ret =  root.definitions[name];
    if(!ret){
        error('!find definition from root error',root,ret);
    }
    ret.name = name;
    return ret;
}

function normalType(typeName:string){
    if(PROTOBUF_TYPES.includes(typeName)){
        return typeName;
    }
    if(typeName=='number'){
        return 'uInt32';
    }
    error('!! error typeName',typeName);
}

function parseSymbol(root:Definition,symbol:Definition,messages:object){
    /*
{
  "type": "object",
  "properties": {
    "normalArr": {
      "description": "The float of the nowplayers.",
      "additionalProperties": "uInt32",
      "type": "array"
    },
    "normalStrArr": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ranks": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/MyRank"
      }
    },
    "rk": {
      "$ref": "#/definitions/MyRank"
    },
    "val": {
      "type": "number"
    }
  },
  "required": [
    "normalArr",
    "normalStrArr",
    "ranks"
  ],
  "definitions": {
    "MyRank": {
      "type": "object",
      "properties": {
        "nickname": {
          "type": "number"
        },
        "ggg": {
          "$ref": "#/definitions/GGG"
        }
      },
      "required": [
        "ggg",
        "nickname"
      ]
    },
    "GGG": {
      "type": "object",
      "properties": {
        "ccgg": {
          "type": "number"
        }
      },
      "required": [
        "ccgg"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-06/schema#"
}
     */
    function parseRef(obj,key,$ref){
        const definition = getDefinitionFromRoot(root,$ref);
        const name = (definition as any).name;
        if(definition.enum){
            if(!definition.type){
                console.log(obj,key,$ref,definition,name);
                throw new Error('!! un know enum type');
            }
            let type = definition.type;
            if(type=='number' || type=='boolean'){
                type = 'uInt32';
            }
            return ' '+ type+' '+key;
        }
        if(!messages[name]){
            messages[name] = parseSymbol(root,definition,messages);
        }
        obj['message '+ name] = messages[name];
        return ' ' +name+' '+key;
    }
    let val = {};
    let i = 1;
    for(let key in symbol.properties){
        const prop = <IProp>symbol.properties[key];
        let msgkey = 'optional';
        // 判断是否是required
        if(prop.type=='array'){
            msgkey = 'repeated';
        }else if(symbol.required && symbol.required.includes(key)){
            msgkey = 'required';
        }
        // 判断类型  type items additionalProperties
        if(prop.type!='array'){
            if(prop.$ref){
                if(prop.type){
                    msgkey+=' '+normalType(prop.type)+' '+key;
                }else{
                    msgkey += parseRef(val,key,prop.$ref);
                }

            }else{
                msgkey+=' '+normalType(prop.type)+' '+key;
            }
        }else{
            // array
            if(prop.additionalProperties){
                msgkey += ' '+normalType(prop.additionalProperties)+' ' + key;
            }else{
                if(prop.items.type){
                    msgkey += ' ' +normalType(prop.items.type)+ ' ' + key;
                }else{
                    msgkey += parseRef(val,key,prop.items.$ref);
                }
            }
        }
        val[msgkey] = i++;
    }
    return val;
}


