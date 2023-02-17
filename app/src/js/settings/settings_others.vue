<template>
    <div v-if="selectedItem" class="others">
        <hr>
        <div class="settings-form">
            <select class="select-others" v-model="itemStr" v-on:change="itemChanged">
                <option v-for="item in KeyboardList" :value="item.nameStr">{{ item.nameStr }}</option>
            </select>
        </div>
    </div>    
</template>

<script setup lang="ts">
import { ref, toRef, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import { Box, changeToBoxAll } from "../state/box";
import { resetToKeyboardData } from "../state/items/preset";
import { KeyboardList } from "../state/items/keyboard_list";
import { getOtherItem } from "./settings_others";

const iStore = useItemStore();

const selectedItem = computed(() => {
    const i = iStore.getSelectedItem();
    if(i) {
        const boxAll = changeToBoxAll(i);
        return boxAll;
    } else {
        return;
    }
});

const itemStr = ref(selectedItem.value?.nameStr ?? "");

const itemChanged = () => {
    const res = getOtherItem(itemStr.value);
    if(!res) return;
    if (!selectedItem.value) return;
    const s = selectedItem.value;

    iStore.setItem({ ...resetToKeyboardData(s), ...res });
};


</script>
