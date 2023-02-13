import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { Box, Box1, Box2, changeToBox1, convert, getRandStr, maxBoxNum } from "./box";


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

    const preset: Box =  {key: "0", id: 0, type: "Monitor", aspect: { w: 1920, h: 1080, arePixelNums: true }, diagonal: 23, top: 0, left: 0, unit: "in"};
    const golden = ref<Box[]>(
        [
            {key: "0", id: 0, type: "Monitor", width: 320, height: 240, top: 20, left: 20, unit: "mm"},
            {key: "0", id: 1, type: "Monitor", width: 640, height: 360, top: 10, left: 160, unit: "mm"},
            {key: "0", id: 2, type: "Monitor", aspect: { w: 21, h: 9, arePixelNums: false }, diagonal: 27.1, top: 30, left: 30, unit: "in"}
        ]
    );
    const setGolden = () => {
        boxes.value = golden.value.map(v => ({...v, key: getRandStr(32)}));
    }

    const scaling = (src: Box[]): Box1[] => {
        return src.map(value => {
            const v = changeToBox1(value);
            const toUnit = "mm";
            return {...v, 
                width:  convert(v.width , v.unit, toUnit) * scale.value, 
                height: convert(v.height, v.unit, toUnit) * scale.value,
                unit: toUnit
            };
        });
    };

    const scalingBoxes = () => scaling(boxes.value);
    
    const addNewBox = () => {
        const id = boxes.value.length;
        if (id >= maxBoxNum) return;
        const key = getRandStr(32);
        // console.log(id, key);
        boxes.value.push({...preset, key, id});
    };

    const selectedItemKey = ref<string>("");
    const setSelectedItemKey = (key: string) => {
        selectedItemKey.value = key;
        // sort selected item to last
        const index = boxes.value.findIndex(v => v.key === key);
        const pops = boxes.value.splice(index, 1)[0];
        boxes.value.push(pops);
    };

    return {boxes, scale, scalingBoxes, setGolden, addNewBox, setSelectedItemKey };
});
