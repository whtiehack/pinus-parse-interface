
####  parse TS interface to pinus-protobuf JSON 
解析  ts 的interface 到 pinus-protobuf用的 json格式。
#### auto generate `serverProtos.json`,`clientProtos.json`.



it can also be used on the `pomelo-protobuf` declaration file(serverProtos.json,clientProtos.json).
```

export interface rank_PlayerHandler_beginGame{
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





export interface onRank{
    /**
     * The float of the nowplayers.
     *
     * @additionalProperties uInt32
     * @TJS-type array
     */
    normalArr:number[];

    normalStrArr:string[];

    ranks:MyRank[];
    rk?:MyRank;
    val?:number;
}

```



to 

```
{
    "onAdd": {
        "required string nickname": 0,
        "required uInt32 nickname11": 1,
        "required uInt32 nowplayers": 2,
        "required float nowplayers2": 3,
        "required double nowplayers3": 4
    },
    "onRank": {
        "repeated uInt32 normalArr": 0,
        "repeated string normalStrArr": 1,
        "message MyRank": {
            "required uInt32 nickname": 0,
            "message GGG": {
                "required uInt32 ccgg": 0
            },
            "required GGG ggg": 1
        },
        "repeated MyRank ranks": 2,
        "optional MyRank rk": 3,
        "optional uInt32 val": 4
    },
    "rank.playerHandler.beginGame": {
        "optional uInt32 code": 0,
        "optional string msg": 1,
        "required uInt32 currank": 2
    }
}
```


pinus: https://github.com/node-pinus/pinus


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

