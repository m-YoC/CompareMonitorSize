<template>
    <div class="menu">
        <div class="item" v-for="item in items" :key="item.key" :class="{selected: isSelected(item.key)}" @click="() => iStore.selectItem(item.key)" :data-testid="`menu-item ${item.key}`"></div>
        <div v-show="items.length < iStore.maxBoxNum()">
            <div class="item" @click="() => iStore.addNewItem()" data-testid="menu-add">
                <IconAdd />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useItemStore } from "../state/state";
import { IconAdd } from "@iconify-prerendered/vue-material-symbols";

const iStore = useItemStore();

const items = computed(() => [...iStore.boxes].sort((l, r) => l.id - r.id));

const isSelected = computed(() => (key: string) => iStore.getSelectedItemKey() === key);

</script>