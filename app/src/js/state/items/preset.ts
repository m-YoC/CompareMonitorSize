import { Box } from "../box"
// import { ratioListAll } from "./monitor_list";
import { KeyboardList } from "./keyboard_list";

export const presetMonitor: Box = {
    key: "0", id: 0, type: "Monitor", top: 0, left: 0, 
    aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, 
    unit: {b1: "mm", b2: "in"} 
};

export const presetKeyboard: Box = {
    key: "0", id: 0, type: "Others", top: 0, left: 0, 
    width: KeyboardList[0].width, height: KeyboardList[0].height,
    unit: {b1: "mm", b2: "mm"},
    nameStr: KeyboardList[0].nameStr,
};


export const resetToMonitorData = (from: Box): Box => {
    return {
        ...presetMonitor, id: from.id, key: from.key, top: from.top, left: from.left
    };
};

export const resetToKeyboardData = (from: Box): Box => {
    return {
        ...presetKeyboard, id: from.id, key: from.key, top: from.top, left: from.left
    }
};

