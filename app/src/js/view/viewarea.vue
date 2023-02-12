<template>
    <div class="view" id="view-area">
        <div>View</div>
        <div>{{ testStore.hello() }}</div>
        <Box v-for="box, idx in boxes" :key="idx" :id="idx" :width="box.width" :height="box.height" :top="box.top" :left="box.left">
            <Selector :type="box.type"/>
        </Box>
    </div>
</template>

<script setup lang="ts">
import Box from "./flowbox.vue";
import Selector from "./item/selector.vue";
import { useTestStore, useItemStore } from "../state/state";

const testStore = useTestStore();
const iStore = useItemStore();

iStore.scale = 0.5;
const boxes = iStore.golden();

</script>
