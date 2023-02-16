<template>
    <div class="settings-form">
        <div class="settings-flex-item-label">
            <label for="input-width">Width:</label>
            <label for="input-height">Height:</label>
        </div>
        <div class="settings-flex-item-form">
            <div>
                <input type="text" id="input-width" class="input-length" v-model="widthStr" v-on:change="widthChanged" :readonly="props.readonly" />
                <select class="select-length" v-model="unitStr" v-on:change="unitChanged">
                    <option value="in">inch</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                </select>
            </div>
            <div>
                <input type="text" id="input-height" class="input-length" v-model="heightStr" v-on:change="heightChanged" :readonly="props.readonly" />
                <select class="select-length" v-model="unitStr" v-on:change="unitChanged">
                    <option value="in">inch</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                </select>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import { Box, BoxAll, changeFromBoxAll, convertBoxUnit } from "../state/box";
import { getFixedLength } from "./settings_monitor";

const props = defineProps<{
    item: BoxAll;
    readonly?: boolean;
}>();

const iStore = useItemStore();

const item = computed(() => props.item);

const widthStr = ref(getFixedLength(item.value.width, item.value.unit.b1));
const heightStr = ref(getFixedLength(item.value.height, item.value.unit.b1));
const unitStr = ref(item.value.unit.b1);

watch([item], () => {
    widthStr.value = getFixedLength(item.value.width, item.value.unit.b1)
    heightStr.value = getFixedLength(item.value.height, item.value.unit.b1);
    unitStr.value = item.value.unit.b1;
});

const widthChanged = () => {
    const width = +widthStr.value;
    if(width && item.value.base === "Box1"){
        iStore.setItem(changeFromBoxAll({ ...item.value, width }));
    }
};

const heightChanged = () => {
    const height = +heightStr.value;
    if(height && item.value.base === "Box1"){
        iStore.setItem(changeFromBoxAll({ ...item.value, height }));
    }
};

const unitChanged = () => {
    iStore.setItem(convertBoxUnit(changeFromBoxAll(item.value), {b1: unitStr.value, b2: item.value.unit.b2}));
};

</script>