

enum EnumTestInt{
    AA,
    CC ,
    DD ,
}

enum EnumTestSTR{
    CC ='aa',
    DD ='cc',
}

export interface enumTest{
    aa?:string;
    bb:number;
    /**
     * @TJS-type uInt32
     */
    cc:EnumTestInt;
    enumstr?:EnumTestSTR;
}