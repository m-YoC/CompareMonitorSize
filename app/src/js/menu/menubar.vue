<template>
    <div class="menu" @click="() => testStore.ex()">Menu</div>
</template>

<script setup lang="ts">
import { useTestStore } from "../state/state";

const testStore = useTestStore();

</script>