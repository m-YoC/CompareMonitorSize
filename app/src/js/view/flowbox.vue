<template>
    <div class="flowbox" :style="[sizeStyle, positionStyle]" @pointerdown="pointerDownEvent">
        <slot>{{ "FlowBox" }}</slot>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import { usePointerStore } from "../state/state";
import { useItemStore } from "../state/state";
import { getRect } from "../lib/rect";

const props = defineProps<{width: number, height: number, top: number, left: number, boxKey: string}>();

const fixPosition = (top: number, left: number) => {
    const viewAreaRect = getRect("view-area");
    if (top < 0) top = 0;
    if(top > viewAreaRect.height - props.height) top = viewAreaRect.height - props.height;

    if (left < 0) left = 0;
    if(left > viewAreaRect.width - props.width) left = viewAreaRect.width - props.width;

    return {top, left};
}

const boxPosition = reactive({top: 0, left: 0});
onMounted(() => {
    const fixedPos = fixPosition(props.top, props.left);
    boxPosition.top = fixedPos.top;
    boxPosition.left = fixedPos.left;

    window.addEventListener("resize", () => {
        const fixedPos = fixPosition(boxPosition.top, boxPosition.left);
        boxPosition.top = fixedPos.top;
        boxPosition.left = fixedPos.left;
        iStore.changeScale();
    });
});

const tl = computed(() => ({top: props.top, left: props.left}));
watch(tl, () => {
    const fixedPos = fixPosition(tl.value.top, tl.value.left);
    boxPosition.top = fixedPos.top;
    boxPosition.left = fixedPos.left;
});

const sizeStyle = computed(() => ({ width: props.width + "px", height: props.height + "px"}));
const positionStyle = computed(() => ({ top: boxPosition.top + "px", left: boxPosition.left + "px"}));

const pointerDownXY = reactive({x: 0, y: 0, top: 0, left: 0});
const pStore = usePointerStore();
const iStore = useItemStore();

const pointerDownEvent = (e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    pStore.clear();

    pointerDownXY.x = e.x;
    pointerDownXY.y = e.y;
    pointerDownXY.left = boxPosition.left;
    pointerDownXY.top = boxPosition.top;

    iStore.selectItem(props.boxKey);

    pStore.isDown = true;

    pStore.moveEvent = (e: PointerEvent) => {
        if (!pStore.isDown) return;
        e.preventDefault();
        e.stopPropagation();

        const nextLeft = pointerDownXY.left + (e.x - pointerDownXY.x);
        const nextTop = pointerDownXY.top + (e.y - pointerDownXY.y);
        const fixedPos = fixPosition(nextTop, nextLeft);
        boxPosition.left = fixedPos.left;
        boxPosition.top = fixedPos.top;
    };

    pStore.upEvent = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const index = iStore.boxes.findIndex(v => v.key === props.boxKey);
        iStore.boxes[index] = {...iStore.boxes[index], top: boxPosition.top, left: boxPosition.left};
        pStore.clear();
    };

    pStore.registerEvent(e.pointerType);
    
};


</script>
