<template>
    <div>
        <label for="input-aspect">Aspect:</label>
        <input type="text" id="input-aspect" list="aspect" v-model="aspectStr" v-on:change="aspectChanged" :readonly="props.readonly" />
        <datalist id="aspect">
            <option v-for="s in getAspectStrArray()" :value="s" />
        </datalist>
    </div>
    <div>
        <label for="input-diagonal">Size:</label>
        <input type="text" id="input-diagonal" v-model="diagonalStr" v-on:change="diagonalChanged" :readonly="props.readonly" />
        <select v-model="unitStr" v-on:change="unitChanged">
            <option value="in">inch</option>
            <option value="mm">mm</option>
            <option value="cm">cm</option>
        </select>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useItemStore } from "../state/state";
import { Box, BoxAll, changeFromBoxAll, convertBoxUnit } from "../state/box";
import { getAspectStr, getFixedLength, getAspectStrArray, getAspectDataFromStr } from "./settings_monitor";

const props = defineProps<{
    item: BoxAll;
    readonly?: boolean;
}>();

const iStore = useItemStore();

const item = computed(() => props.item);

const aspectStr = ref(getAspectStr(item.value.aspect));
const diagonalStr = ref(getFixedLength(item.value.diagonal, item.value.unit.b2));
const unitStr = ref(item.value.unit.b2);

watch([item], () => {
    aspectStr.value = getAspectStr(item.value.aspect);
    diagonalStr.value = getFixedLength(item.value.diagonal, item.value.unit.b2);
    unitStr.value = item.value.unit.b2;
});

const aspectChanged = () => {
    const aspect = getAspectDataFromStr(aspectStr.value);
    if(aspect && item.value.base === "Box2"){
        iStore.setItem(changeFromBoxAll({ ...item.value, aspect }));
    }
};

const diagonalChanged = () => {
    const diagonal = +diagonalStr.value;
    if(diagonal && item.value.base === "Box2"){
        iStore.setItem(changeFromBoxAll({ ...item.value, diagonal }));
    }
};

const unitChanged = () => {
    iStore.setItem(convertBoxUnit(changeFromBoxAll(item.value), {b1: item.value.unit.b1, b2: unitStr.value}));
};

</script>
