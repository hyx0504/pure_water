<template>
  <div class="route-page flex flex-row flex-wrap gap-4">
    <!-- LOOP3 REALITY -->
    <div class="bottom-container">
      <Panel></Panel>
    </div>
    <!-- LOOP3 SIMULATION -->
    <div class="bottom-container">
      <Echarts></Echarts>
    </div>
  </div>
</template>
<script setup lang="ts">
import Panel from './baicComs/Panel/index.vue'
import Echarts from './baicComs/Echarts/index.vue'
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.bottom-container {
  width: calc(50% - 0.5rem);
  height: calc(100%);
}
.none-select-user {
  /* 火狐 */
  -moz-user-select: none;
  /* Safari 和 欧朋 */
  -webkit-user-select: none;
  /* IE10+ and Edge */
  -ms-user-select: none;
  /* Standard syntax 标准语法(谷歌) */
  user-select: none;
}
</style>
