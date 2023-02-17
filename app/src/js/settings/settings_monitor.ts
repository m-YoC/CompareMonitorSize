import { round } from "../lib/math";
import { eachUnitDigit, LengthUnit } from "../state/box";
import {ratioListAll, ratioList, ratioListSpecial} from "../state/items/monitor_list";

const getRatioStrWithSub = (m: string, s: string) => `${m} ${s}`;

export const getNameStrArray = (): string[] => {
    let res: string[] = [];
    ratioListAll.forEach(v => {
        if(v.sub) v.sub.forEach(w => res.push(getRatioStrWithSub(v.str, w.str)));
        res.push(v.str);
    });
    return res;
};

// Get string "ww:hh" from aspect ratio
export const getNameStr = (a: {w: number, h: number, arePixelNums: boolean}): string => {
    const roundDigit = -2;
    const aspect = round(a.h / a.w, roundDigit);

    for(let i = 0; i < ratioList.length; i++) {
        const v = ratioList[i];
        if( aspect === round(v.h/v.w, roundDigit) ) {
            if (!a.arePixelNums || v.sub == undefined) return v.str;

            for(let j = 0; j < v.sub.length; j++) {
                if( a.w === v.sub[j].w && a.h === v.sub[j].h ) return getRatioStrWithSub(v.str, v.sub[j].str);
            }
            return v.str;
        } 
    }

    return `${a.w}:${a.h}`;
};

export const getFixedLength = (x: number, unit: LengthUnit): string => {
    return x.toFixed(Math.max(-eachUnitDigit[unit], 0));
};

export const getAspectDataFromStr = (str: string): {w: number, h: number, arePixelNums: boolean} | undefined => {
    // リスト内に同じものがあるか？
    for(let i = 0; i < ratioListAll.length; i++) {
        const v = ratioListAll[i];
        if( v.sub ) for(let j = 0; j < v.sub.length; j++) {
            const s = getRatioStrWithSub(v.str, v.sub[j].str);
            if ( str === s ) return { w: v.sub[j].w, h: v.sub[j].h, arePixelNums: true };
        }
        if (str === v.str) return { w: v.w, h: v.h, arePixelNums: false };
    }

    // ない場合はregexで構文解析
    const pattern = /^(\d+(?:\.\d+)?)[^\d\.]+(\d+(?:\.\d+)?)[^\d\.]*?/;
    const res = str.match(pattern);
    if (res) return { w: +res[1], h: +res[2], arePixelNums: false };

    return undefined;
};

export const isDataOfSpecialList = (str: string): boolean => {
    // リスト内に同じものがあるか？
    for(let i = 0; i < ratioListSpecial.length; i++) {
        const v = ratioListSpecial[i];
        if( str === v.str) return true;
    }

    return false;
};
