import { defineStore } from "pinia";
import { ref } from "vue";

export const usePointerStore = defineStore("pointer", () => {
    const isDown = ref(false);
    const moveEvent = ref<(e: PointerEvent) => void>(() => {});
    const upEvent = ref<(e: PointerEvent) => void>(() => {});
    const touchmoveStop = ref((e: TouchEvent) => e.preventDefault());

    const registerEvent = (pointerType: string) => {
        window.addEventListener("pointermove", moveEvent.value, { passive: false });
        window.addEventListener("pointerup", upEvent.value, { passive: false });
        document.addEventListener("touchmove", touchmoveStop.value, { passive: false });

        if(pointerType === "touch") {
            document.body.className = "lock-browser";
            document.documentElement.className = "lock-browser";
        }
    }

    const clear = () => {
        isDown.value = false;
        window.removeEventListener("pointermove", moveEvent.value);
        window.removeEventListener("pointerup", upEvent.value);
        document.removeEventListener("touchmove", touchmoveStop.value);
        document.body.className = "";
        document.documentElement.className = "";
        moveEvent.value = () => {};
        upEvent.value = () => {};
    }

    

    return { isDown, moveEvent, upEvent, registerEvent, clear };
});

