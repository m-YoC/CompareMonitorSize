<template>
    <div class="settings-back">
        <div class="settings">
            <!---<div>{{ selectedItem?.key ?? "---" }}</div>--->
            <!---<div>{{ selectedItem?.type ?? "undef" }}</div>--->
            <!---<div>{{ selectedItemAll }}</div>--->
            <div v-if="selectedItem?.type">
                <select class="select-type" v-model="typeStr" v-on:change="() => {}">
                    <option value="Monitor">Monitor</option>
                </select>
            </div>
            <MonitorSettings v-if="selectedItem?.type === 'Monitor'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import MonitorSettings  from "./settings_monitor.vue";
import { Box, changeToBoxAll } from "../state/box";
import { ItemType } from "../lib/types";

const iStore = useItemStore();
const selectedItem = computed(() => iStore.getSelectedItem());

const typeStr = ref<ItemType | "">(selectedItem.value?.type ?? "");

watch([selectedItem], () => {
    typeStr.value = selectedItem.value?.type ?? "";
});

const selectedItemAll = computed(() => changeToBoxAll(iStore.getSelectedItem() as Box));

</script>
