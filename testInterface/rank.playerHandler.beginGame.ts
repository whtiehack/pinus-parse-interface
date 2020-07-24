/*
  "rank.playerHandler.beginGame":{
    "optional uInt32 code":1,
    "optional string msg":2,
    "optional uInt32 currank":3
  },
 */

// duplicate IGG name
import { GGG } from "./share/myrank";

interface IGG {
    ggenv?: string[];
    zz?: number;
}

export interface rank_playerHandler_beginGame_Req {
    token: number;
    msg?: string;
    duplicateIgg?: IGG
    sharewithServerused?: GGG
}

export interface rank_playerHandler_beginGame_Res {
    /**
     * @TJS-type uInt32
     */
    code?: number;
    msg?: string;
    /**
     * @TJS-type uInt32
     */
    currank: number;
}
