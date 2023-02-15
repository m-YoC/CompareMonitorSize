<template>
    <div class="view no-user-select" id="view-area">
        <div>View</div>
        <div>{{ testStore.hello() }}</div>
        <Box v-for="box in boxes" :key="box.key" :boxKey="box.key" :width="box.width" :height="box.height" :top="box.top" :left="box.left">
            <Selector :type="box.type"/>
        </Box>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import Box from "./flowbox.vue";
import Selector from "./item/selector.vue";
import { useTestStore, useItemStore } from "../state/state";

const testStore = useTestStore();
const iStore = useItemStore();

onMounted(() => {
    iStore.setGolden();
});

const boxes = computed(() => iStore.scalingItems());


</script>
