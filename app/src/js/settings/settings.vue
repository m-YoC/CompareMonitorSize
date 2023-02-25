<template>
    <div class="settings-back">
        <div class="settings">
            <!---<div>{{ selectedItem?.key ?? "---" }}</div>--->
            <!---<div>{{ selectedItem?.type ?? "undef" }}</div>--->
            <!---<div>{{ selectedItemAll }}</div>--->
            <div v-if="selectedItem?.type">
                <select class="select-type" v-model="typeStr" v-on:change="typeChanged" data-testid="settings-select-type">
                    <option value="Monitor">Monitor</option>
                    <option value="Others">Other Item</option>
                </select>
            </div>
            <MonitorSettings v-if="selectedItem?.type === 'Monitor'" />
            <OthersSettings v-if="selectedItem?.type === 'Others'" />
            <div v-if="selectedItem?.type" >
                <hr>
                <div class="buttons">
                    <div class="move-center-button" @click="() => iStore.updateSelectedItemPosToCenter()" data-testid="settings-to-center">
                        <IconCenterFocusWeakOutline />
                    </div>
                    <div class="delete-button" @click="() => iStore.deleteSelectedItem()" data-testid="settings-delete">
                        <IconDeleteOutlineRounded />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import MonitorSettings  from "./settings_monitor.vue";
import OthersSettings  from "./settings_others.vue";
import { Box, changeToBoxAll } from "../state/box";
import { resetToMonitorData, resetToKeyboardData } from "../state/items/preset";
import { ItemType } from "../lib/types";
import { IconCenterFocusWeakOutline, IconDeleteOutlineRounded } from "@iconify-prerendered/vue-material-symbols";

const iStore = useItemStore();
const selectedItem = computed(() => iStore.getSelectedItem());

const typeStr = ref<ItemType | "">(selectedItem.value?.type ?? "");

watch([selectedItem], () => {
    typeStr.value = selectedItem.value?.type ?? "";
});

const selectedItemAll = computed(() => changeToBoxAll(iStore.getSelectedItem() as Box));

const typeChanged = () => {
    if (!selectedItem.value) return;
    const s = selectedItem.value;

    if (typeStr.value === "Monitor" && s.type !== "Monitor") {
        iStore.setItem(resetToMonitorData(s));
        return;
    }

    if (typeStr.value === "Others" && s.type !== "Others") {
        iStore.setItem(resetToKeyboardData(s));
        return;
    }
}

</script>
