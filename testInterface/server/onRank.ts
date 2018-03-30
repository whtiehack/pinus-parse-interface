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