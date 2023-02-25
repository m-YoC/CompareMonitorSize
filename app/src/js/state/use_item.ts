import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { Box, Box1, Box2, BoxBaseData, extractBoxBase, changeToBox1, convertBoxUnit } from "./box";
import { getRect, getScreenRect } from "../lib/rect";
import { getRandStr } from "../lib/rand_str";
import { presetMonitor } from "./items/preset";
import { dbGet, dbSet } from "./idb";

export const maxBoxNum = () => 6;

export const goldenItems: Box[] = [
    {...extractBoxBase(presetMonitor), id: 0, width: 320, height: 240, top: 20, left: 20},
    {...extractBoxBase(presetMonitor), id: 1, aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, top: 30, left: 30},
    {...extractBoxBase(presetMonitor), id: 2, aspect: { w: 21, h: 9, arePixelNums: false }, diagonal: 27.1, top: 30, left: 30}
];

export const getB1mm = (box: Box) => {
    return convertBoxUnit(changeToBox1(box), {b1: "mm"});
};

export const getMaxWidthOfBoxes = (boxes: Box[]) => {
    const widthSet = boxes.map(v => getB1mm(v).width);
    if (widthSet.length === 0) return undefined;
    const maxBoxWidth = widthSet.reduce((a, b) => Math.max(a, b));
    return maxBoxWidth;
};


export const getCenterPosition = (box: Box, scale: number) => {
    const boxB1mm = getB1mm(box);
    const viewAreaRect = getRect("view-area");
    const top  = viewAreaRect.height / 2 - boxB1mm.height * scale / 2;
    const left = viewAreaRect.width / 2 - boxB1mm.width * scale / 2;
    return {top, left};
};

export const calcNewScale = (maxBoxWidth: number): number => {
    if (maxBoxWidth <= 0) return 1;
    const screen = getScreenRect();
    const r = screen.width / maxBoxWidth;

    if (screen.width > 1024) return r / 3;
    if(screen.width > 640) return r / 2;
    return r / 1.5;
}


/* ------------------------------------------------------------------------- */

export const useItemStore = defineStore("item", () => {

    const boxes = ref<Box[]>([]);
    const scale = ref(1);
    const selectedItemKey = ref<string>("");

    const golden = ref<Box[]>(goldenItems);
    const setGolden = () => {
        boxes.value = golden.value.map(v => ({...v, key: getRandStr(32)}));
    }

    const changeScale = () => {
        const maxWidth = getMaxWidthOfBoxes(boxes.value);
        if(!maxWidth) return;
        scale.value = calcNewScale(maxWidth);
    }



    /* --- getter ---------------------------------------------------------------------- */

    const getItem = (key: string) => {
        const index = boxes.value.findIndex(v => v.key === key);
        if (index === -1) return undefined;

        return boxes.value[index];
    }

    const getSelectedItemKey = () => selectedItemKey.value;

    const getSelectedItem = () => getItem(selectedItemKey.value);

    const getScalingItems = (): Box1[] => {
        return boxes.value.map(value => {
            // Change the Box type before convert (otherwise, the unit1 setting will be the same).
            const v = getB1mm(value);
            return {...v, width: v.width * scale.value, height: v.height * scale.value };
        });
    };



    /* --- setter / update ---------------------------------------------------------------------- */

    const selectItem = (key: string) => {
        selectedItemKey.value = key;
        // sort selected item to last
        const index = boxes.value.findIndex(v => v.key === key);
        if(index === -1) return false;

        const pops = boxes.value.splice(index, 1)[0];
        boxes.value.push(pops);
        return true;
    };

    const setItem = (item: Box) => {
        const index = boxes.value.findIndex(v => v.key === item.key);
        if (index === -1) return false;

        boxes.value[index] = { ...item };
        return true;
    }

    const addNewItem = () => {
        const id = boxes.value.length;
        if (id >= maxBoxNum()) return undefined;

        const key = getRandStr(32);
        const tl = getCenterPosition(presetMonitor, scale.value);

        boxes.value.push({...presetMonitor, top: tl.top, left: tl.left, key, id});
        selectItem(key);

        return key;
    };

    const updateSelectedItemPosToCenter = () => {
        const item = getSelectedItem();
        if (!item) return false;

        const tl = getCenterPosition(item, scale.value);
        return setItem({...item, top: tl.top, left: tl.left});
    }


    /* --- delete ---------------------------------------------------------------------- */

    const deleteSelectedItem = () => {
        const index = boxes.value.findIndex(v => v.key === selectedItemKey.value);
        if (index === -1) return false;

        const pops = boxes.value.splice(index, 1)[0];
        boxes.value.forEach(v => { if (v.id > pops.id) v.id-- });

        return true;
    }


    /* ------------------------------------------------------------------------- */

    const init = async () => {
        // setGolden(); return;

        const dbData = await dbGet();
        
        if (dbData.length === 0) {
            addNewItem();
        } else {
            boxes.value = dbData;
        }
    }

    watch(boxes, async () => {
        changeScale();
        dbSet(boxes.value);
        // console.log(await dbGet());
    }, {deep: true});


    return {
        boxes, 
        maxBoxNum, 
        init, 
        setGolden, 
        changeScale,

        getItem, 
        getSelectedItemKey, 
        getSelectedItem, 
        getScalingItems, 
        
        selectItem, 
        setItem, 
        addNewItem, 
        updateSelectedItemPosToCenter, 

        deleteSelectedItem };
});
