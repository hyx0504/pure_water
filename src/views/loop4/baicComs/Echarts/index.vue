<template>
  <div class="show-container">
    <el-scrollbar view-class="w-full h-full box-border flex flex-wrap gap-1">
      <div
        class="show__title flex gap-2 flex-wrap items-center justify-between"
      >
        <div class="flex w-60 text-1.2rem font-600">LOOP4 SIMULATION</div>
        <HandleTimeNew
          @updataTime="(startTime, endTime) => getData(startTime, endTime)"
        />
      </div>
      <!-- 8个框 -->
      <div class="container_swapper">
        <echartContainer
          key="0"
          label="TT-662"
          :mse-value="echartMseValue[0]"
          value="℃"
          :chart-data="chartDatas[0]"
        />
        <echartContainer
          key="1"
          label="PT-662"
          :mse-value="echartMseValue[1]"
          value="mpa"
          :chart-data="chartDatas[1]"
        />
      </div>
      <div class="container_swapper">
        <echartContainer
          key="2"
          label="DNIT-662"
          :mse-value="echartMseValue[2]"
          value="ppb"
          :chart-data="chartDatas[2]"
        />
        <echartContainer
          key="3"
          label="PTIL-662"
          :mse-value="echartMseValue[3]"
          value="pcs/ml"
          :chart-data="chartDatas[3]"
        />
      </div>
      <div class="container_swapper">
        <echartContainer
          key="4"
          label="TOCT-662"
          :mse-value="echartMseValue[4]"
          value="ppb"
          :chart-data="chartDatas[4]"
        />
        <echartContainer
          key="5"
          label="SiO2T-662"
          :mse-value="echartMseValue[5]"
          value="ppb"
          :chart-data="chartDatas[5]"
        />
      </div>
      <div class="container_swapper">
        <echartContainer
          class="mb-4"
          key="6"
          label="DOIT-662"
          :mse-value="echartMseValue[6]"
          value="ppb"
          :chart-data="chartDatas[6]"
        />
        <echartContainer
          class="mb-4"
          key="7"
          label="RIT-662"
          :mse-value="echartMseValue[7]"
          value="MΩ.cm"
          :chart-data="chartDatas[7]"
        />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import HandleTimeNew from '../../coms/HandleTime/HandleTimeNew.vue'
import echartContainer from './LineContainer/Container.vue'

import useChartData from './useChartData'
const chartDatas = ref([{}, {}, {}, {}, {}, {}, {}, {}])
const echartMseValue = ref<string[]>([])
async function getData(startTime: string, endTime: string) {
  const dataArr = await Promise.all([
    useChartData({
      tag: 'TT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'PIT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'DNIT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'PTCL_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'TOCIT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'SIO2IT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'DOIT_662.OUT',
      endTime,
      startTime,
    }),
    useChartData({
      tag: 'RIT_662.OUT',
      endTime,
      startTime,
    }),
  ])
  let allSum = []
  for (let i = 0; i < dataArr.length; i++) {
    let iData = dataArr[i] as any
    const preArr = iData.preData.slice(0, iData.preData.length / 2)
    const realArr = iData.reality.slice(0, iData.reality.length / 2)
    let sum = 0
    for (let j = 0; j < preArr.length; j++) {
      sum += (realArr[j] - preArr[j]) * (realArr[j] - preArr[j])
    }
    allSum.push((sum / (iData.preData.length / 2)).toExponential(2))
  }
  echartMseValue.value = allSum
  chartDatas.value = dataArr
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.show-container {
  width: 100%;
  height: 100%;
  background: $bg-color;
}
.show__title {
  width: 100%;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  padding-left: 1rem;
  background: linear-gradient(
    90deg,
    rgba(28, 64, 93, 0.9) 0%,
    rgba(84, 147, 198, 0) 100%
  );
}
.container_swapper {
  height: 14.3rem;
  width: 100%;
  display: flex;
  gap: 4px;
}
</style>
