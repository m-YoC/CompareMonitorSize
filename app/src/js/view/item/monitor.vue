<template>
    <div class="view-monitor-bezel">
        <div class="view-monitor-panel"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">

.view-monitor-bezel {
    width: calc(100% + 4px + 4px); // + padding-size + border-size
    height: calc(100% + 10px + 4px); // + padding-size + border-size
    margin-top: -4px;
    margin-left: -4px;
    padding: 2px;
    padding-bottom: 8px;
    border: 2px solid #777e;
    background: #fff6;
    border-radius: 8px;
}

.view-monitor-panel {
    width: 100%;
    height: 100%;
    border: 2px solid #777e;
    border-radius: 6px;
    // background: #fff6;
}

</style>
