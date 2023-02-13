<template>
    <div class="menu" @click="() => iStore.addNewBox()">Menu</div>
</template>

<script setup lang="ts">
import { useItemStore } from "../state/state";

const iStore = useItemStore();

</script>