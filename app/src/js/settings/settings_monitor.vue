<template>
    <div v-if="selectedItem" class="monitor">
        <hr>
        <div class="with-radio">
            <input type="radio" id="Box2" name="monitor-type" value="Box2" v-model="radio_vModel" v-on:change="radioChanged">
            <div>
                <MonitorSettingsB2 :item="selectedItem" :readonly="selectedItem?.base !== 'Box2'" />
            </div>
        </div>
        <hr>
        <div class="with-radio">
            <input type="radio" id="Box1" name="monitor-type" value="Box1" v-model="radio_vModel" v-on:change="radioChanged">
            <div>
                <MonitorSettingsB1 :item="selectedItem" :readonly="selectedItem?.base !== 'Box1'" />
            </div>
        </div>        
    </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import { Box, changeToBoxAll, changeFromBoxAll } from "../state/box";
import MonitorSettingsB1 from "./settings_monitor_b1.vue";
import MonitorSettingsB2 from "./settings_monitor_b2.vue";


const iStore = useItemStore();

const radio_vModel = ref("");
const selectedKey = ref("");

const selectedItem = computed(() => {
    const i = iStore.getSelectedItem();
    if(i) {
        const boxAll = changeToBoxAll(i);
        if(selectedKey.value !== i.key) radio_vModel.value = boxAll.base;
        selectedKey.value = i.key;
        // console.log(boxAll.id, boxAll.base);
        return boxAll;
    } else {
        radio_vModel.value = "";
        return;
    }
});

const radioChanged = () => {
    if(selectedItem.value && (radio_vModel.value === "Box1" || radio_vModel.value === "Box2")) {
        iStore.setItem(changeFromBoxAll({...selectedItem.value, base: radio_vModel.value}));
    }
};


</script>
