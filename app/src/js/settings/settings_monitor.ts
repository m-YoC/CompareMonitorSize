import { round } from "../lib/math";
import { eachUnitDigit, LengthUnit } from "../state/box";

interface ratioListSubType {
    w: number;
    h: number;
    str: string;
};

interface ratioListType {
    w: number;
    h: number;
    str: string;
    sub?: ratioListSubType[];
}

const ratioList_16x9: ratioListSubType[] = [
    {w: 1280, h: 720, str: "(HD:1280x720)"},
    {w: 1920, h: 1080, str: "(FHD:1920x1080)"},
    {w: 2560, h: 1440, str: "(WQHD:2560x1440)"},
    {w: 3840, h: 2160, str: "(UHD:3840x2160)"}
];

const ratioList_16x10: ratioListSubType[] = [
    {w: 1280, h: 800, str: "(WXGA:1280x800)"},
    {w: 1920, h: 1200, str: "(WUXGA:1920x1200)"},
    {w: 2560, h: 1600, str: "(WQXGA:2560x1600)"},
    {w: 3840, h: 2400, str: "(QUXGA Wide:3840x2400)"}
];

const ratioList_21x9: ratioListSubType[] = [
    {w: 2560, h: 1080, str: "(UWFHD:2560x1080)"},
    {w: 3440, h: 1440, str: "(UWQHD:3440x1440)"},
    {w: 3840, h: 1600, str: "(UWQHD+:3840x1600)"},
    {w: 5120, h: 2160, str: "(5K2K:5120x2160)"}
];

const ratioList: ratioListType[] = [
    {w: 16, h: 9, str: "16:9", sub: ratioList_16x9 },
    {w: 9, h: 16, str: "9:16"},
    {w: 16, h: 10, str: "16:10", sub: ratioList_16x10},
    {w: 10, h: 16, str: "10:16"},
    {w: 21, h: 9, str: "21:9", sub: ratioList_21x9 },
    {w: 9, h: 21, str: "9:21"},
    {w: 21, h: 10, str: "21:10"},
    {w: 10, h: 21, str: "10:21"},
    {w: 4, h: 3, str: "4:3"},
    {w: 3, h: 2, str: "3:2"},
];

const ratioListSpecial: ratioListType[] = [
    {w: 9, h: 19.5, str: "9:19.5 (iPhone)"},
    {w: 9, h: 16, str: "9:16 (iPhoneSE)"},
    {w: 3, h: 4, str: "3:4 (iPad)"},
    {w: 3, h: 4.3, str: "3:4.3 (iPad Pro 11inch)"},
    {w: 2, h: 3, str: "2:3 (iPad Mini6)"},
    {w: 20, h: 13, str: "20:13 (MacBook Air M2 13.6inch)"},
    {w: 16, h: 10, str: "16:10 (MacBook Air M1 13.3inch)"},
    {w: 16, h: 10, str: "16:10 (MacBook Pro 13.3inch)"},
    {w: 1.54, h: 1, str: "1.54:1 (MacBook Pro 14.2inch)"},
    {w: 1.547, h: 1, str: "1.547:1 (MacBook Pro 16.2inch)"},
    {w: 3, h: 2, str: "3:2 (Surface)"},
];

const ratioListAll = [...ratioList, ...ratioListSpecial];

const getRatioStrWithSub = (m: string, s: string) => `${m} ${s}`;

export const getAspectStrArray = (): string[] => {
    let res: string[] = [];
    ratioListAll.forEach(v => {
        if(v.sub) v.sub.forEach(w => res.push(getRatioStrWithSub(v.str, w.str)));
        res.push(v.str);
    });
    return res;
};

// Get string "ww:hh" from aspect ratio
export const getAspectStr = (a: {w: number, h: number, arePixelNums: boolean}): string => {
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
