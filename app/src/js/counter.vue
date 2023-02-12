<template>
    <div class="counter-box">
        <div>Counter Component ( max:{{  maxSize }} )</div>
        <div class="number">{{ countRes }}</div>
        <div><button class="btn" @click="()=>{ count++ }">click here</button></div>
        <div><button @click="()=>{ count = 0 }">reset</button></div>
    </div>    
</template>

<script setup lang="ts">
import { ref, reactive, computed, mergeProps } from "vue";

const props = defineProps<{
    maxSize: number;
    countFunc: (c: number) => number;
}>();

const count = ref(0);
const countRes = computed((): string => props.countFunc(count.value) >= props.maxSize ? "Congratulations!" : `${props.countFunc(count.value)}`);
</script>

<style lang="scss">

.counter-box {
    margin: 20px;
    padding: 50px;
    border: 2px solid #333;
    width: 300px;
    text-align: center;
    background: #eee;

    .number {
        font-size: 30px;
        font-weight: 600;
        margin: 0 auto;
    }

    .btn {
        margin-top: 30px;
        width: 100px;
        height: 50px;
        border-radius: 10px;
        background: rgb(161, 180, 228);
    }
}

</style>
