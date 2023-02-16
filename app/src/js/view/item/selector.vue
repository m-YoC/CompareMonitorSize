<template>
    <Monitor v-if="type == 'Monitor'" :boxKey="boxKey" />
</template>

<script setup lang="ts">
import Monitor from "./monitor.vue";
import { ItemType } from "./selector";

defineProps<{
    type: ItemType;
    boxKey: string;
}>();

</script>
