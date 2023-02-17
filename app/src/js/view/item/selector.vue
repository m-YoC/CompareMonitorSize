<template>
    <Monitor v-if="type == 'Monitor'" :boxKey="boxKey" />
    <Other v-if="type == 'Others'" :boxKey="boxKey" />
</template>

<script setup lang="ts">
import Monitor from "./monitor.vue";
import Other from "./other.vue";
import { ItemType } from "./selector";

defineProps<{
    type: ItemType;
    boxKey: string;
}>();

</script>
