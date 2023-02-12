import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { ItemType } from "../view/item/selector";

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

interface Box {
    type: ItemType;
    width: number;
    height: number;
    top: number;
    left: number;
};

export const useItemStore = defineStore("item", () => {

    const boxes = ref<Box[]>([]);
    const scale = ref(1);

    const goldenBase = ref<Box[]>(
        [
            {type: "Monitor", width: 640, height: 480, top: 20, left: 20},
            {type: "Monitor", width: 1280, height: 720, top: 10, left: 160},
        ]
    );

    const scaling = (src: Box[]): Box[] => {
        return src.map(value => ({...value, width: value.width * scale.value, height: value.height * scale.value}));
    };

    const scalingBoxes = () => scaling(boxes.value);
    const golden = () => {
        boxes.value = goldenBase.value;
        return scalingBoxes();
    }

    const releaseCurrentSelectedItem = ref<() => void>(() => {});

    return {boxes, scale, scalingBoxes, golden, releaseCurrentSelectedItem };
});
