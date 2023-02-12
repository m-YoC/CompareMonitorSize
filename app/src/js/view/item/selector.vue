<template>
    <Monitor v-if="type == 'Monitor'" />
</template>

<script setup lang="ts">
import Monitor from "./monitor.vue";
import { ItemType } from "./selector";

defineProps<{
    type: ItemType;
}>();

</script>
