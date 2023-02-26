<template>
  <div>
    <p>clicked: {{ count }}-times</p>
    <p>{{ computedText }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);

const increment = () => {
    count.value++;
};

const computedText = computed(() => "computed-" + count.value);

</script>