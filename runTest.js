require('ts-node/register');
const main = require('./src/');


let test = main.parseToPinusProtobuf('./testInterface');
console.log('server result', JSON.stringify(test, null, 4));

main.parseAndWrite('./testInterface', './tmp.json');
let compare = JSON.stringify({
    "client": {
        "rank.playerHandler.beginGame": {
            "required uInt32 token": 1,
            "optional string msg": 2,
            "message IGG_1": {
                "repeated string ggenv": 1,
                "optional uInt32 zz": 2
            },
            "optional IGG_1 duplicateIgg": 3,
            "message GGG": {
                "required uInt32 ccgg": 1
            },
            "optional GGG sharewithServerused": 4
        },
        "rank.playerHandler.onlyNotify": {
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
})
if (process.env['NODE_ENV'] === 'ci' && JSON.stringify(test) !== compare) {
    console.error(JSON.stringify(test), "compare:", compare)
    throw new Error("error")
}


test = main.parseToPinusProtobuf('./testInterface', '_Req', '_Res', true);
console.log('@@@server result', JSON.stringify(test, null, 4));

if (process.env['NODE_ENV'] === 'ci') {
    let val = JSON.stringify({
        "client": {
            "rank.playerHandler.beginGame": {
                "required uInt32 token": 1,
                "optional string msg": 2,
                "optional IGG_1 duplicateIgg": 3,
                "optional GGG sharewithServerused": 4
            },
            "rank.playerHandler.onlyNotify": {
                "required uInt32 token": 1,
                "optional string msg": 2
            },
            "message IGG_1": {
                "repeated string ggenv": 1,
                "optional uInt32 zz": 2
            },
            "message GGG": {
                "required uInt32 ccgg": 1
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
                "optional GGG innerGGG": 4,
                "repeated MyRank ranks": 5,
                "optional MyRank rk": 6,
                "optional uInt32 val": 7,
                "required string ffname": 8,
                "repeated IGG aa": 9,
                "repeated string ggenv": 10
            },
            "rank.playerHandler.beginGame": {
                "optional uInt32 code": 1,
                "optional string msg": 2,
                "required uInt32 currank": 3
            },
            "message GGG": {
                "required uInt32 ccgg": 1
            },
            "message MyRank": {
                "required uInt32 nickname": 1,
                "required GGG ggg": 2,
                "required GGG xxx": 3
            },
            "message IGG": {
                "repeated string ggenv": 1
            }
        }
    })
    if (JSON.stringify(test) !== val) {
        console.error(JSON.stringify(test), "compare:", compare)
        throw new Error("error")
    }
}


