<template>
  <div class="route-page flex flex-col gap-4">
    <!-- 操作栏 -->
    <div
      class="box-border p-4 flex flex-wrap items-center justify-between bg-[#18293b] gap-4"
    >
      <div class="text-1.2rem flex items-center">
        <span class="mr-4">Tag:</span>

        <el-select filterable clearable class="w-27" v-model="selectAIValue">
          <el-option
            v-for="item in TagAIOptions"
            :value="item.tag"
            :label="item.tag"
            :key="item.tag"
          />
        </el-select>
        <span class="mx-4">Covariance:</span>

        <el-select
          filterable
          clearable
          class="w-35"
          v-model="selectConvarianceValue"
        >
          <el-option
            v-for="item in TagConvarianceOptions"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
        <el-select
          filterable
          clearable
          class="w-25"
          v-model="selectPercentValue"
        >
          <el-option
            v-for="item in TagPercentOptions"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center">
          <div class="w-46">
            <el-date-picker
              :clearable="false"
              v-model="dateValue"
              @change="dateChangeFn"
              type="datetime"
              range-separator="To"
              format="YYYY/MM/DD HH:mm"
              start-placeholder="Start date"
              end-placeholder="End date"
              :disabledDate="disabledDateFun"
            />
          </div>
          <span class="text-1.2rem mx-3">Δ 720m</span>
        </div>

        <div class="flex">
          <el-button type="primary" @click="getFn" :loading="isSearchLoading">
            Inquire
          </el-button>
          <el-button plain @click="exportFn">Export</el-button>
        </div>
      </div>
    </div>
    <!-- 展示栏 -->
    <div class="flex-1 w-full box-border p4 bg-[#18293b]">
      <div class="wfull hfull">
        <Line :chartData="chartData" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Line from './coms/Line.vue'
import dayjs from 'dayjs'
import {
  getTagAIData,
  getTagConvarianceData,
  exportAIData,
  getTagPercentData,
  getAIData,
} from '@/request/ai'
/**
 * #下拉控制
 */
const selectAIValue = ref('')
const TagAIOptions = ref<Record<string, any>[] | null>(null)
TagAIOptions.value = getTagAIData()
const selectConvarianceValue = ref('')
const TagConvarianceOptions = ref<Record<string, any>[] | null>(null)
TagConvarianceOptions.value = getTagConvarianceData()
const selectPercentValue = ref<number | ''>('')
const TagPercentOptions = getTagPercentData()
/**
 * #查询控制
 * 此处需要注意: chartData内变量名字和实际展示的名字存在不一样
 * 在Line组件内部和excel导出时，都将变量名重新格式化了一次
 */
const isSearchLoading = ref(false)
async function getFn() {
  isSearchLoading.value = true
  let params: Record<string, any> = {
    tag: '',
    rate: '',
    startTime: '',
    endTime: '',
  }
  /**
   * #校验
   */
  if (
    !selectAIValue.value ||
    !selectConvarianceValue.value ||
    !selectPercentValue.value ||
    !dateValue.value
  ) {
    ElMessage({
      showClose: true,
      message: 'Incomplete parameters',
      type: 'warning',
    })
    isSearchLoading.value = false
    return
  }
  params.startTime = dayjs(
    new Date(dateValue.value.getTime() - 720 * 60000),
  ).format('YYYY-MM-DD HH:mm:ss')
  params.endTime = dayjs(
    new Date(dateValue.value.getTime() + 720 * 60000),
  ).format('YYYY-MM-DD HH:mm:ss')
  params.tag = selectAIValue.value + selectConvarianceValue.value
  params.rate = selectPercentValue.value
  const { code, payload } = (await getAIData(
    params as {
      startTime: string
      endTime: string
      tag: string
      rate: number
    },
  )) as any
  if (code === 200 && payload) {
    const {
      time,
      trueData,
      range,
      min,
      preData,
      maxData,
      minData,
      preRateData,
    } = payload

    chartData.value = {
      haveData: time.length === 0 ? false : true,
      maxData,
      minData,
      time,
      reality: trueData,
      range,
      min,
      preData,
      preRateData,
    }
  } else {
    ElMessage({
      showClose: true,
      message: `Not ${params.tag}'s Data`,
      type: 'error',
    })
  }
  isSearchLoading.value = false
}

/**
 * #时间控制
 */

const dateValue = ref<Date | ''>('')
let dataSwapperValue: Date | '' = ''
function disabledDateFun(time: any) {
  return time.getTime() >= new Date().getTime()
}
function initialDateValue() {
  // 获取当前时间
  const now = new Date(dayjs(new Date()).format('YYYY-MM-DD HH:mm') + ':00')
  dateValue.value = now
  dataSwapperValue = now
}
function dateChangeFn() {
  if (dateValue.value && dateValue.value.getTime() > new Date().getTime()) {
    dateValue.value = dataSwapperValue
    ElMessage({
      showClose: true,
      message: 'Time cannot be in the future',
      type: 'warning',
    })
  } else {
    dataSwapperValue = dateValue.value
  }
}
initialDateValue()

/**
 * #导出
 */
function exportFn() {
  if (!chartData.value.haveData) {
    ElMessage({
      showClose: true,
      message: 'No data',
      type: 'warning',
    })
    return
  }
  // 开始处理数据
  const excelData: any = []
  for (let key in chartData.value) {
    if (key === 'haveData') continue
    if (key === 'time') {
      chartData.value.time?.forEach((item) => {
        excelData.push({
          time: item,
        })
      })
    }
    if (key === 'reality') {
      chartData.value.reality?.forEach((item, index) => {
        excelData[index].reality = item
      })
    }
    if (key === 'preData') {
      chartData.value.preData?.forEach((item, index) => {
        excelData[index].preData = item
      })
    }
    if (key === 'min') {
      chartData.value.min?.forEach((item, index) => {
        excelData[index].min = item
      })
    }
    if (key === 'range') {
      chartData.value.range?.forEach((item, index) => {
        if (chartData.value?.min !== undefined)
          excelData[index].max = chartData?.value?.min[index] + item
      })
    }
    if (key === 'preRateData') {
      chartData.value.preRateData?.forEach((item, index) => {
        if (chartData.value?.preRateData !== undefined)
          excelData[index].preRateData =
            chartData?.value?.preRateData[index] + item
      })
    }
  }
  exportAIData('AIModel', selectAIValue.value, excelData)
}

/**
 * #echarts数据
 */
const chartData = ref<{
  haveData: boolean
  maxData?: number
  minData?: number
  time?: string[]
  preRateData?: string[]
  reality?: string[]
  preData?: string[]
  min?: string[]
  range?: string[]
}>({
  haveData: false,
})
</script>
<style lang="scss" scoped>
.el-checkbox.el-checkbox--large {
  height: auto;
}
</style>
