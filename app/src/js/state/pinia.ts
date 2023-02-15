import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { Box, Box1, Box2, BoxBaseData, extractBoxBase, changeToBox1, convertBoxUnit, getRandStr, maxBoxNum } from "./box";
import { getRect } from "../lib/rect";

// Composition API type
export const useTestStore = defineStore("test", () => {
    // state
    const text = ref("pinia");
    // getters
    const hello = () => "hello " + text.value;
    // actions
    const ex = () => text.value += "!";

    return {
        text, hello, ex
    };
});

export const usePointerStore = defineStore("pointer", () => {
    const isDown = ref(false);
    const moveEvent = ref<(e: PointerEvent) => void>(() => {});
    const upEvent = ref<(e: PointerEvent) => void>(() => {});

    const registerEvent = (pointerType: string) => {
        window.addEventListener("pointermove", moveEvent.value);
        window.addEventListener("pointerup", upEvent.value);

        if(pointerType === "touch") {
            document.body.className = "lock-browser";
            document.documentElement.className = "lock-browser";
        }
    }

    const clear = () => {
        isDown.value = false;
        window.removeEventListener("pointermove", moveEvent.value);
        window.removeEventListener("pointerup", upEvent.value);
        document.body.className = "";
        document.documentElement.className = "";
        moveEvent.value = () => {};
        upEvent.value = () => {};
    }

    

    return { isDown, moveEvent, upEvent, registerEvent, clear };
});




export const useItemStore = defineStore("item", () => {

    const boxes = ref<Box[]>([]);
    const scale = ref(1);

    const preset: Box = {key: "0", id: 0, type: "Monitor", aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, top: 0, left: 0, unit: {b1: "mm", b2: "in"} };
    const golden = ref<Box[]>(
        [
            {...extractBoxBase(preset), id: 0, width: 320, height: 240, top: 20, left: 20},
            {...extractBoxBase(preset), id: 1, aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, top: 30, left: 30},
            {...extractBoxBase(preset), id: 2, aspect: { w: 21, h: 9, arePixelNums: false }, diagonal: 27.1, top: 30, left: 30}
        ]
    );
    const setGolden = () => {
        boxes.value = golden.value.map(v => ({...v, key: getRandStr(32)}));
    }

    const scaling = (src: Box[]): Box1[] => {
        return src.map(value => {
            // Change the Box type before convert (otherwise, the unit1 setting will be the same).
            const v = convertBoxUnit(changeToBox1(value), {...value.unit, b1: "mm"});
            return {...v, 
                width:  v.width * scale.value, 
                height: v.height * scale.value,
            };
        });
    };

    const scalingItems = () => scaling(boxes.value);
    
    const addNewItem = () => {
        const id = boxes.value.length;
        if (id >= maxBoxNum) return;
        const key = getRandStr(32);
        // console.log(id, key);
        const itemB1 = convertBoxUnit(changeToBox1(preset), {...preset.unit, b1: "mm"});
        const viewAreaRect = getRect("view-area");
        const top  = viewAreaRect.height / 2 - itemB1.height * scale.value / 2;
        const left = viewAreaRect.width / 2 - itemB1.width * scale.value / 2;

        boxes.value.push({...preset, top, left, key, id});

        return key;
    };

    const selectedItemKey = ref<string>("");

    const selectItem = (key: string) => {
        selectedItemKey.value = key;
        // sort selected item to last
        const index = boxes.value.findIndex(v => v.key === key);
        if(index === -1) return;

        const pops = boxes.value.splice(index, 1)[0];
        boxes.value.push(pops);
    };

    const getSelectedItem = () => {
        const index = boxes.value.findIndex(v => v.key === selectedItemKey.value);
        if (index === -1) return undefined;

        return boxes.value[index];
    }

    const setItem = (item: Box) => {
        const key = item.key;
        const index = boxes.value.findIndex(v => v.key === key);
        if (index === -1) return false;

        boxes.value[index] = { ...item };
        return true;
    }

    const updateSelectedItemPosToCenter = () => {
        const item = getSelectedItem();
        if (!item) return;

        const itemB1 = convertBoxUnit(changeToBox1(item), {...item.unit, b1: "mm"});
        const viewAreaRect = getRect("view-area");
        const top  = viewAreaRect.height / 2 - itemB1.height * scale.value / 2;
        const left = viewAreaRect.width / 2 - itemB1.width * scale.value / 2;

        setItem({...item, top, left});
    }

    const deleteSelectedItem = () => {
        const index = boxes.value.findIndex(v => v.key === selectedItemKey.value);
        if (index === -1) return false;

        const pops = boxes.value.splice(index, 1)[0];
        boxes.value.forEach(v => {
            if (v.id > pops.id) v.id--;
        });

        return true;
    }

    return {boxes, scale, scalingItems, setGolden, 
        addNewItem, selectedItemKey, selectItem, getSelectedItem, setItem, updateSelectedItemPosToCenter, deleteSelectedItem };
});
