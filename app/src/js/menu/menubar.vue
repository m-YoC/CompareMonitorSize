<template>
    <div class="menu">
        <div class="item" v-for="item in items" :key="item.key" :class="{selected:isSelected(item.key)}" @click="() => iStore.selectItem(item.key)">{{ item.id + 1 }}</div>
        <div class="item" @click="() => iStore.addNewItem()">+</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useItemStore } from "../state/state";

const iStore = useItemStore();

const items = computed(() => [...iStore.boxes].sort(((l, r) => l.id - r.id)));

const isSelected = computed(() => (key: string) => iStore.selectedItemKey === key);

</script>