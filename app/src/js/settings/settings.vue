<template>
    <div class="settings">
        <div>{{ selectedItem?.key ?? "---" }}</div>
        <div>{{ selectedItem?.type ?? "undef" }}</div>
        <div>{{ selectedItemAll }}</div>
        <MonitorSettings v-if="selectedItem?.type === 'Monitor'" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useItemStore } from "../state/state";
import MonitorSettings  from "./settings_monitor.vue";
import { Box, changeToBoxAll } from "../state/box";

const iStore = useItemStore();
const selectedItem = computed(() => iStore.getSelectedItem());

const selectedItemAll = computed(() => changeToBoxAll(iStore.getSelectedItem() as Box));

</script>
