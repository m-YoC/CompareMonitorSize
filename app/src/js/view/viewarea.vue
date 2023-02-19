<template>
    <div class="view no-user-select" id="view-area">
        <Box v-for="box in boxes" :key="box.key" :boxKey="box.key" :width="box.width" :height="box.height" :top="box.top" :left="box.left">
            <Selector :type="box.type" :boxKey="box.key" />
        </Box>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import Box from "./flowbox.vue";
import Selector from "./item/selector.vue";
import { useItemStore } from "../state/state";

const iStore = useItemStore();

onMounted(() => {
    iStore.init();
});

const boxes = computed(() => iStore.getScalingItems());


</script>
