<template>
    <div class="view-monitor-bezel no-user-select">
        <div class="view-monitor-panel no-user-select" v-bind:class="[boxKey === iStore.getSelectedItemKey() ? ' selected' : '']"></div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from "../../state/state";

defineProps<{
    boxKey: string;
}>();

const iStore = useItemStore();
</script>

<style scoped lang="scss">
@import "../../../css/color.scss";

.view-monitor-bezel {
    width: calc(100% + 4px + 4px); // + padding-size + border-size
    height: calc(100% + 10px + 4px); // + padding-size + border-size
    margin-top: -4px;
    margin-left: -4px;
    padding: 2px;
    padding-bottom: 8px;
    
    border-radius: 8px;

    @include color-theme {
        border: 2px solid color(item-frame);
        background: color(item-back);
    }
}

.view-monitor-panel {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    // background: #fff6;

    @include color-theme {
        border: 2px solid color(item-frame);
    }

    &.selected {
        @include color-theme {
            background: color(item-back-selected);
        }
    }
}

</style>
