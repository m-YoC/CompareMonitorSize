

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

export const ratioList: ratioListType[] = [
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

export const ratioListSpecial: ratioListType[] = [
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

export const ratioListAll = [...ratioList, ...ratioListSpecial];