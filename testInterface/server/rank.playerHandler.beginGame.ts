/*
  "rank.playerHandler.beginGame":{
    "optional uInt32 code":1,
    "optional string msg":2,
    "optional uInt32 currank":3
  },
 */

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