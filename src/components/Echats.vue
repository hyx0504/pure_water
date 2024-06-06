<!-- 二次封装组件 -->
<!-- 外部导入options来触发内部 -->
<!-- 无数据时传入{} -->
<template>
  <div class="w-full h-full relative">
    <div class="noData" v-if="JSON.stringify(props.chartOption) === '{}'">
      noData
    </div>
    <div v-else ref="chartRef" class="chart"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'

const props = withDefaults(defineProps<{ chartOption: any | null }>(), {
  chartOption: {},
})
let instance: any = null
const chartRef = ref<HTMLButtonElement>()

const initChart = () => {
  nextTick(() => {
    if (JSON.stringify(props.chartOption) !== '{}' && chartRef.value) {
      if (!instance) instance = echarts.init(chartRef.value as any)
      instance.setOption(props.chartOption, true)
    } else {
      instance = null
    }
  })
}
watch(
  () => props.chartOption,
  () => {
    initChart()
  },
  { immediate: true, deep: true },
)

window.addEventListener('resize', () => {
  if (instance) instance.resize()
})
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
.noData {
  position: absolute;
}
</style>
