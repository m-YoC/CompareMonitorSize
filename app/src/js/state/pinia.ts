import { defineStore } from "pinia";
import { ref } from "vue";

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

export { usePointerStore } from "./use_pointer";

export { useItemStore } from "./use_item";
