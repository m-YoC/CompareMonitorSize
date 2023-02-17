
interface OtherItemListType {
    width: number;
    height: number;
    nameStr: string;
};

// 1 keytop = 19.05mm
// h -> 6key + 0.5 key space = 6.5key 
// full size: w -> 22key + 0.5key space * 2 = 23key
// 1800: w -> 19key + 0.5key space = 19.5key
// tenkeyless: w -> 18key + 0.5key space = 18.5key...

interface wh {
    w: number;
    h: number;
};

const keytop: number = 19.05;
const space: number = keytop * 0.5;
const edge: number = keytop * 0.3;

const mainKeys: wh = { w: 15, h: 5 };
const functions: wh = { w: 15, h: 1 };
const tenkeys: wh = {w: 4, h: 5 };
const pauses: wh = { w: 3, h: 1 };
const deletes: wh = { w: 3, h: 5 };

/*
--------- functions -------- / --- pauses  --- / ///////////////
////////////////////////////////////////////////////////////////
--------- main keys -------- / --- deletes --- / --- tenkeys ---
*/

const length = (keyNum: number, spaceNum: number): number => {
    return keytop * keyNum + space * spaceNum + edge * 2; 
};

export const KeyboardList: OtherItemListType[] = [
    { nameStr: "Full Size Keyboard", 
        width: length(mainKeys.w + deletes.w + tenkeys.w, 2), 
        height: length(mainKeys.h + functions.h, 1),
    },
    { nameStr: "1800 Keyboard", 
        width: length(mainKeys.w + tenkeys.w, 1), 
        height: length(mainKeys.h + functions.h, 1),
    },
    { nameStr: "96%/90% Keyboard", 
        width: length(mainKeys.w + tenkeys.w, 0), 
        height: length(mainKeys.h + functions.h, 0),
    },
    { nameStr: "Tenkeyless Keyboard", 
        width: length(mainKeys.w + deletes.w, 1), 
        height: length(mainKeys.h + functions.h, 1),
    },
    { nameStr: "75% Keyboard", 
        width: length(mainKeys.w + 1, 0), 
        height: length(mainKeys.h + functions.h, 0), 
    },
    { nameStr: "65% Keyboard", 
        width: length(mainKeys.w + 1, 0), 
        height: length(mainKeys.h, 0), 
    },
    { nameStr: "60% Keyboard", 
        width: length(mainKeys.w, 0), 
        height: length(mainKeys.h, 0), 
    },
];

export const isKeyboard = (str: string): boolean => {
    return KeyboardList.find(s => s.nameStr === str) !== undefined;
}

export const mainAreaPercent = (w: number, h: number): wh => {
    const wp = 100 * mainKeys.w * keytop / w;
    const hp = 100 * mainKeys.h * keytop / h;
    return {w: wp, h: hp};
};

export const edgePercent = (w: number, h: number): wh => {
    const wp = 100 * edge / w;
    const hp = 100 * edge / h;
    return {w: wp, h: hp};
};
