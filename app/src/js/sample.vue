<template>
  <div class="sample-box">
    <h2 class="vue-js-style">{{ message }}</h2>
    <h3 class="vue-js-style-inlier">{{ message3 }}</h3>
  </div>
  <Counter :maxSize="(100 as number)" :countFunc="(c: number): number => c * 2" />
</template>


<script setup lang="ts">
import { ref, reactive, computed, toRefs } from "vue";
import Counter from "./counter.vue";

// ref primitive
const message = ref("Hello Vue.js3!");
// ref object
const message2 = reactive({
  one: "This is a", two: "vue.js message", three: "using reactive function"
});

// computedRef type is read-only?
const message3 = computed(() => `${message2.one} modified ${message2.two} ${message2.three}`);

const message4 = (str: string) => {
  message.value = `${message.value} ${str} !`; 
};

message4("and hello composition API");

</script>

<style scoped lang="scss">

.sample-box {
  background: lightgreen;
  padding: 10px;

  .vue-js-style-inlier {
    color: darkred;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}

</style>
