<template>
  <div class="echart_container">
    <div class="flex box-border w-full justify-between px-4">
      <div class="w-1/2 flex justify-between">
        <span>{{ label }}</span>
        <span>{{ 'MSE' }} {{ mseValue }}</span>
      </div>
      <div>{{ value }}</div>
    </div>
    <!-- echart -->
    <div class="echart_swapper">
      <Line :chart-data="chartData"></Line>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { EchartsProps } from './types.ts'
import Line from './Line.vue'
defineProps<EchartsProps>()
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.echart_container {
  width: calc((100% - 4px) / 2);
  height: calc(100%);
  box-sizing: border-box;
  background: $bg-container-color;
}
.echart_swapper {
  width: 100%;
  height: calc(100% - 18.4px);
}
</style>
