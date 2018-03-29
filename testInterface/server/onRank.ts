// "onSegRanks": {
//     "message Array": {
//         "required uInt32 rank": 1,
//             "required string nickname": 2,
//             "required uInt32 score": 3,
//             "required uInt32 tag": 4,
//             "required uInt32 dienum": 5
//     },
//     "repeated Array ranks": 1
// },

import {MyRank} from "../share/myrank";

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