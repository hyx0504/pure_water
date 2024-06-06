<template>
  <div class="route-page">
    <el-scrollbar view-class="w-full h-full">
      <!-- numbers -->
      <div class="w-full mb-4 h-20% flex gap-4">
        <div
          class="card-number"
          :key="index"
          v-for="(item, index) in numberOptions"
        >
          <div class="card-number__title">{{ item.label }}</div>
          <div
            :class="{
              'card-number__content': true,
              'color-[#0d3e94]': [0, 2].includes(index),
            }"
          >
            {{ item.value }}
            <span class="text-8 ml-2 mt-6">{{ item.unit }}</span>
          </div>
        </div>
      </div>
      <!-- charts -->
      <div class="w-full container-charts flex flex-row flex-wrap gap-4">
        <div class="card-charts">
          <div class="card-charts__title">CPU Usage</div>
          <div class="card-charts__content">
            <CpuUsage :chart-data="cpuUsageData" />
          </div>
        </div>
        <div class="card-charts">
          <div class="card-charts__title">Network</div>
          <div class="card-charts__content">
            <NetWork :chart-data="netWorkData" />
          </div>
        </div>
        <div class="card-charts">
          <div class="card-charts__title">Memory Usage</div>
          <div class="card-charts__content">
            <MemoryUsage :chart-data="memoryUsageData" />
          </div>
        </div>
        <div class="card-charts">
          <div class="card-charts__title">Processes</div>
          <div class="card-charts__content">
            <Processes :chart-data="processesData" />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import CpuUsage from './coms/CpuUsage.vue'
import { getSystemData } from '@/request/system'
import Processes from './coms/Processes.vue'
import NetWork from './coms/NetWork.vue'
import MemoryUsage from './coms/MemoryUsage.vue'
import WSClass from '@/request/websocket/websocket.js'
import dayjs from 'dayjs'
const length = 30
const numberOptions = ref([
  { label: 'System Uptime', value: 0, unit: '  days' },
  { label: 'NCPUs', value: 0, unit: '  cpus' },
  { label: 'System Load', value: 0, unit: '%' },
  { label: 'Total Memory', value: 0, unit: '  GB' },
])
const cpuUsageData = ref<{
  xData: string[]
  data: number[]
  haveData: boolean
}>({
  haveData: false,
  xData: Array(30).fill(''),
  data: Array(30).fill(null),
})
const processesData = ref<{
  xData: string[]
  data: number[]
  haveData: boolean
}>({
  haveData: false,
  xData: Array(30).fill(''),
  data: Array(30).fill(null),
})
const memoryUsageData = ref<{
  xData: string[]
  data: number[]
  haveData: boolean
}>({
  haveData: false,
  xData: Array(30).fill(''),
  data: Array(30).fill(null),
})
const netWorkData = ref<{
  xData: string[]
  data: Record<string, any>
  haveData: boolean
}>({
  haveData: false,
  xData: Array(30).fill(''),
  data: { up: Array(30).fill(null), low: Array(30).fill(null) },
})
let websocketTotal: any = null
function getTotalData(res: any) {
  const { swap, network, memoryUsage, cpuUsage } = res
  // 刷新number
  console.log(res)
  // 刷新processesData
  if (![null, undefined].includes(network)) setNetWorkData(network)
  if (![null, undefined].includes(swap)) setProcessesData(swap)
  if (![null, undefined].includes(memoryUsage)) setMemoryUsageData(memoryUsage)
  if (![null, undefined].includes(cpuUsage)) setCpuUsageData(cpuUsage)
}

// 数据处理函数说明
/**
 * 开始为30个null填充的data,30个‘’填充的xData
 * 逻辑1: 如果前面第一项是null,then->shift,and当前数据push，
 * 视觉上会新增一个点，并往前推进
 * 逻辑2: 如果length>现在的数据length，并且null已经去除
 * push，视觉上点会密集（滚动条省略）
 * 逻辑3: 如果length = 现在数据， shift(first), push(new)
 */
function setProcessesData(value: number) {
  const { xData, data } = processesData.value
  if (xData[0] !== '' && xData.length <= length) {
    xData.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    data.push(Math.round(value * 100) / 100)
  } else {
    const xWrapper = xData.slice(1, length)
    const dataWrapper = data.slice(1, length)
    xWrapper.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    dataWrapper.push(Math.round(value * 100) / 100)
    processesData.value = {
      haveData: true,
      xData: xWrapper,
      data: dataWrapper,
    }
  }
}
function setCpuUsageData(value: number) {
  // SystemLoad数据加载
  numberOptions.value[2].value = Math.round(value * 100) / 100
  const { xData, data } = cpuUsageData.value
  if (xData.length < length && xData[0] !== '') {
    xData.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    data.push(Math.round(value * 100) / 100)
  } else {
    const xWrapper = xData.slice(1, length)
    const dataWrapper = data.slice(1, length)
    xWrapper.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    dataWrapper.push(Math.round(value * 100) / 100)
    cpuUsageData.value = {
      haveData: true,
      xData: xWrapper,
      data: dataWrapper,
    }
  }
}
function setMemoryUsageData(value: number) {
  const { xData, data } = memoryUsageData.value
  if (xData.length < length && xData[0] !== '') {
    xData.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    data.push(Math.round(value * 100) / 100)
  } else {
    const xWrapper = xData.slice(1, length)
    const dataWrapper = data.slice(1, length)
    xWrapper.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    dataWrapper.push(Math.round(value * 100) / 100)
    memoryUsageData.value = {
      haveData: true,
      xData: xWrapper,
      data: dataWrapper,
    }
  }
}
function setNetWorkData(value: { up: number; low: number }) {
  const { xData, data } = netWorkData.value
  if (xData.length < length && xData[0] !== '') {
    xData.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    data.up.push(Math.round(value.up * 100) / 100)
    data.low.push(Math.round(value.low * 100) / 100)
  } else {
    const xWrapper = xData.slice(1, length)
    const dataUpWrapper = data.up.slice(1, length)
    const dataLowWrapper = data.low.slice(1, length)
    xWrapper.push(dayjs(new Date()).format('MM/DD HH:mm:ss'))
    dataUpWrapper.push(Math.round(value.up * 100) / 100)
    dataLowWrapper.push(Math.round(value.low * 100) / 100)
    netWorkData.value = {
      haveData: true,
      xData: xWrapper,
      data: { up: dataUpWrapper, low: dataLowWrapper },
    }
  }
}
function getConnectWs() {
  websocketTotal && websocketTotal.close()
  const optionLine = {
    url: '/systemSocket',
    callback: getTotalData,
  }
  websocketTotal = new WSClass(optionLine)
}
watchEffect(async () => {
  const { code, payload } = (await getSystemData()) as any
  if (code === 200) {
    const { operationDays, systemMemory, ncpus } = payload
    numberOptions.value[0].value = operationDays ?? 0
    numberOptions.value[1].value = ncpus ?? 0
    numberOptions.value[3].value = systemMemory ?? 0
  }
})
onMounted(() => {
  getConnectWs()
})
onBeforeUnmount(() => {
  websocketTotal.close()
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.container-charts {
  height: calc(80% - 16px);
}
.card-number {
  box-sizing: border-box;
  width: calc((100% - 3rem) / 4);
  height: 100%;
  background: $bg-container-color;
  .card-number__title {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    background: linear-gradient(
      90deg,
      rgba(87, 106, 121, 0.9) 0%,
      rgba(20, 130, 223, 0) 100%
    );
  }
  .card-number__content {
    height: calc(100% - 1.8rem);
    width: 100%;
    font-size: 70px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    span {
      color: $primary;
    }
  }
}
.card-charts {
  height: calc((100% - 1rem) / 2);
  width: calc((100% - 1rem) / 2);
  background: $bg-container-color;
  .card-charts__title {
    display: flex;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgba(87, 106, 121, 0.9) 0%,
      rgba(20, 130, 223, 0) 100%
    );
  }
  .card-charts__content {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: calc(100% - 3.5rem);
  }
}
</style>
