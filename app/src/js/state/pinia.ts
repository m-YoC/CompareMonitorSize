import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { Box, Box1, Box2, changeToBox1 } from "./box";


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

    const golden = ref<Box[]>(
        [
            {type: "Monitor", width: 640, height: 480, top: 20, left: 20, unit: "milli"},
            {type: "Monitor", width: 1280, height: 720, top: 10, left: 160, unit: "milli"},
            {type: "Monitor", aspect: { w: 21, h: 9, arePixelNums: false }, diagonal: 1800, top: 30, left: 30, unit: "milli"}
        ]
    );

    const scaling = (src: Box[]): Box1[] => {
        return src.map(value => {
            const v = changeToBox1(value);
            return {...v, width: v.width * scale.value, height: v.height * scale.value};
        });
    };

    const scalingBoxes = () => scaling(boxes.value);
    const setGolden = () => {
        boxes.value = golden.value;
    }

    const releaseCurrentSelectedItem = ref<() => void>(() => {});

    return {boxes, scale, scalingBoxes, setGolden, releaseCurrentSelectedItem };
});
