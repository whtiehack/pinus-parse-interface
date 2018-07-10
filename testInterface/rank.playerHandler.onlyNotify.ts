/*
  "rank.playerHandler.beginGame":{
    "optional uInt32 code":1,
    "optional string msg":2,
    "optional uInt32 currank":3
  },
 */


export interface rank_playerHandler_onlyNotify_Req{
    token:number;
    msg?:string;
}

