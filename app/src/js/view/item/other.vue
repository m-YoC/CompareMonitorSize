<template>
    <div class="view-others-outer no-user-select">
        <div class="view-others no-user-select" v-bind:class="[boxKey === iStore.selectedItemKey ? ' selected' : '']">
            <div v-if="isKeyboard(item?.nameStr ?? '')" class="keyboard-main-area" :style="[mainAreaStyle]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useItemStore } from "../../state/state";
import { Box, changeToBoxAll } from "../../state/box";
import { mainAreaPercent, edgePercent, isKeyboard } from "../../state/items/keyboard_list";

const props = defineProps<{
    boxKey: string;
}>();

const iStore = useItemStore();

const item = computed(() => {
    const i = iStore.getItem(props.boxKey);
    if(i) {
        const boxAll = changeToBoxAll(i);
        return boxAll;
    } else {
        return;
    }
});

const mainAreaStyle = computed(() => {
    if(!item.value) return {}; 

    const mp = mainAreaPercent(item.value.width, item.value.height);
    const ep = edgePercent(item.value.width, item.value.height);

    return {
        left: ep.w + "%",
        bottom: ep.h + "%",
        width: mp.w + "%",
        height: mp.h + "%",
    };
});

</script>

<style scoped lang="scss">
@import "../../../css/color.scss";


.view-others-outer {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;

    @include color-theme {
        border: 2px solid color(item-frame);
        background: color(item-back);
    }
    .view-others {
        width: 100%;
        height: 100%;

        &.selected {
            @include color-theme {
                background: color(item-back-selected);
            }
        }
        .keyboard-main-area {
            position: absolute;
            border-radius: 4px;

            @include color-theme {
                border: 2px solid color(item-frame);
            }
        }
    }
}

</style>
