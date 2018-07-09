
####  parse TS interface to pinus-protobuf JSON 
解析  ts 的interface 到 pinus-protobuf用的 json格式。



pinus: https://github.com/node-pinus/pinus

## changelog
```
v0.1.5:
文件统一解析。 加快解析速度

v0.1.3:
修复interface成员全部为可选时会出错的bug。

```
## install

`npm install pinus-parse-interface`

or

`yarn add pinus-parse-interface`


## usage

```
const main = require('pinus-parse-interface');

const test = main.parseToPinusProtobuf('path_to_you_interface_dir');
console.log('result',JSON.stringify(test,null,4));
```

## interface 结构约定
1. 以文件名为消息名。
1. 客户端与服务端的结构放到一起。
1. 客户端消息，以 `文件名_Req` 为结尾
1. 服务端消息，以 `文件名_Res` 为结尾
1. 文件名中的`.` 会被转换成 `_`
1. 服务端推送消息直接以文件名命名
1.  `_Res`,`_Req` 可以使用自定义名字

> 例如: `rank.playerHandler.beginGame.ts`
> 会寻找 `rank_playerHandler_beginGame_Req`,`rank_playerHandler_beginGame_Res` 
 


#### auto generate 
`serverProtos.json`,`clientProtos.json`.

### example

it can also be used on the `pomelo-protobuf` declaration file(serverProtos.json,clientProtos.json).

input
```
// onAdd.ts
export interface onAdd{
    nickname:string;
    nickname11:number;

    nowplayers:number;
    /**
     * The float of the nowplayers.
     *
     * @TJS-type float
     */
    nowplayers2:number;
    /**
     * The float of the nowplayers.
     *
     * @TJS-type double
     */
    nowplayers3:number;
}


// onRank.ts


import {GGG, MyRank} from "../share/myrank";


interface IGG{
    ggenv?:string[];
}

interface IFF{
    ffname:string;
    aa?:IGG[];
}

enum EnumTest{
    AA,
    BB,
    CC
}

export interface onRank extends IFF,IGG{
    /**
     * The float of the nowplayers.
     *
     * @additionalProperties uInt32
     * @TJS-type array
     */
    normalArr:number[];
    /**
     * @TJS-type uInt32
     */
    enum:EnumTest;
    normalStrArr:string[];
    innerGGG?:GGG;
    ranks:MyRank[];
    rk?:MyRank;
    val?:number;
}

// rank.playerHandler.beginGame.ts

export interface rank_playerHandler_beginGame_Req{
    token:number;
    msg?:string;
}

export interface rank_playerHandler_beginGame_Res{
    /**
     * @TJS-type uInt32
     */
    code?:number;
    msg?:string;
    /**
     * @TJS-type uInt32
     */
    currank:number;
}


```



output

```
{
    "client": {
        "rank.playerHandler.beginGame": {
            "required uInt32 token": 1,
            "optional string msg": 2
        }
    },
    "server": {
        "enumTest": {
            "optional string aa": 1,
            "required uInt32 bb": 2,
            "required uInt32 cc": 3,
            "optional string enumstr": 4
        },
        "onAdd": {
            "required string nickname": 1,
            "required uInt32 nickname11": 2,
            "required uInt32 nowplayers": 3,
            "required float nowplayers2": 4,
            "required double nowplayers3": 5
        },
        "onRank": {
            "repeated uInt32 normalArr": 1,
            "required uInt32 enum": 2,
            "repeated string normalStrArr": 3,
            "message GGG": {
                "required uInt32 ccgg": 1
            },
            "optional GGG innerGGG": 4,
            "message MyRank": {
                "required uInt32 nickname": 1,
                "message GGG": {
                    "required uInt32 ccgg": 1
                },
                "required GGG ggg": 2,
                "required GGG xxx": 3
            },
            "repeated MyRank ranks": 5,
            "optional MyRank rk": 6,
            "optional uInt32 val": 7,
            "required string ffname": 8,
            "message IGG": {
                "repeated string ggenv": 1
            },
            "repeated IGG aa": 9,
            "repeated string ggenv": 10
        },
        "rank.playerHandler.beginGame": {
            "optional uInt32 code": 1,
            "optional string msg": 2,
            "required uInt32 currank": 3
        }
    }
}
```

