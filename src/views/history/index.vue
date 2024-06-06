<template>
  <div class="route-page flex flex-col gap-4">
    <!-- 操作栏 -->
    <div
      class="box-border p-4 flex flex-wrap items-center justify-between bg-[#18293b] gap-4"
    >
      <div class="text-1.2rem flex items-center">
        <span class="mr-4">Tag:</span>

        <el-select
          @change="tagChange"
          filterable
          clearable
          class="my-select border border-white border-solid"
          v-model="selectValue"
        >
          <el-option
            v-for="item in tagOptions"
            :value="item.tag"
            :label="item.tag"
            :key="item.tag"
          />
        </el-select>
        <template v-if="isShow">
          <span class="mr-2 ml-4">PreDiction:</span>
          <el-checkbox v-model="isChecked" label="" />
        </template>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div class="w-125 mr-4">
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            @change="dateValueChange"
            range-separator="To"
            format="YYYY/MM/DD HH:mm"
            start-placeholder="Start date"
            end-placeholder="End date"
            :disabledDate="disabledDateFun"
          />
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
import {
  exportHistoryData,
  getTagData,
  getHistoryTrueData,
  getHistoryData,
} from '@/request/history'

import dayjs from 'dayjs'
const selectValue = ref('')
const isSearchLoading = ref(false)
let dateValueSwapper: [Date, Date] | '' = ''
const dateValue = ref<[Date, Date] | ''>('')
const tagOptions = ref<Record<string, any>[] | null>(null)
tagOptions.value = getTagData()
const isChecked = ref(false)
const isShow = ref(false)
const chartData = ref<{
  haveData: boolean
  isChecked: boolean
  maxData?: number
  minData?: number
  time?: string[]
  reality?: string[]
  preData?: string[]
  min?: string[]
  range?: string[]
}>({
  haveData: false,
  isChecked: false,
})
function disabledDateFun(time: any) {
  return time.getTime() >= new Date().getTime()
}
function exportFn() {
  if (!selectValue.value) {
    ElMessage({
      showClose: true,
      message: 'No point selected',
      type: 'warning',
    })
    return
  }
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
        excelData[index].real = item
      })
    }
    if (key === 'preData') {
      chartData.value.preData?.forEach((item, index) => {
        excelData[index].predict_mean = item
      })
    }
    if (key === 'min') {
      chartData.value.min?.forEach((item, index) => {
        excelData[index].predict_low = item
      })
    }
    if (key === 'range') {
      chartData.value.range?.forEach((item, index) => {
        if (chartData.value?.min !== undefined)
          excelData[index].predict_up = chartData?.value?.min[index] + item
      })
    }
  }
  exportHistoryData('History', selectValue.value, excelData)
}
async function getFn() {
  isSearchLoading.value = true
  let params = { tag: '', startTime: '', endTime: '' }
  if (!selectValue.value) {
    ElMessage({
      showClose: true,
      message: 'No point selected',
      type: 'warning',
    })
    isSearchLoading.value = false
    return
  }
  params.tag = selectValue.value
  if (!dateValue.value) {
    ElMessage({
      showClose: true,
      message: 'No time selected',
      type: 'warning',
    })
    isSearchLoading.value = false
    return
  }
  params.startTime = dayjs(dateValue.value[0]).format('YYYY-MM-DD HH:mm:ss')
  params.endTime = dayjs(dateValue.value[1]).format('YYYY-MM-DD HH:mm:ss')
  let api = getHistoryTrueData
  if (isChecked.value) api = getHistoryData
  // const { code, payload } = (await api(params)) as any
  // if (code === 200) {
  //   const { time, trueData, range, min, preData, maxData, minData } = payload
  //   if (isChecked.value) {
  //     chartData.value = {
  //       haveData: time.length === 0 ? false : true,
  //       maxData,
  //       minData,
  //       isChecked: isChecked.value,
  //       time,
  //       reality: trueData,
  //       range,
  //       min,
  //       preData,
  //     }
  //   } else {
  //     chartData.value = {
  //       haveData: time.length === 0 ? false : true,
  //       maxData,
  //       minData,
  //       isChecked: isChecked.value,
  //       time,
  //       reality: trueData,
  //     }
  //   }
  // } else {
  //   ElMessage({
  //     showClose: true,
  //     message: `Not ${params.tag}'s Data`,
  //     type: 'error',
  //   })
  // }
  // isSearchLoading.value = false
  try {
    const { payload } = (await api(params)) as any
    const { time, trueData, range, min, preData, maxData, minData } = payload
    if (isChecked.value) {
      chartData.value = {
        haveData: time.length === 0 ? false : true,
        maxData,
        minData,
        isChecked: isChecked.value,
        time,
        reality: trueData,
        range,
        min,
        preData,
      }
    } else {
      chartData.value = {
        haveData: time.length === 0 ? false : true,
        maxData,
        minData,
        isChecked: isChecked.value,
        time,
        reality: trueData,
      }
    }
  } finally {
    ElMessage({
      showClose: true,
      message: `Not ${params.tag}'s Data`,
      type: 'error',
    })
    isSearchLoading.value = false
  }
}
function tagChange(data: string) {
  if (data) {
    const tag = tagOptions.value?.find((item) => item.tag === data)
    if (tag?.isTrue) {
      isChecked.value = true
      isShow.value = true
    } else {
      isChecked.value = false
      isShow.value = false
    }
  } else {
    isChecked.value = false
    isShow.value = false
  }
}
function dateValueChange(newDate: [Date, Date] | '' | null) {
  // 转换为毫秒时间戳
  if (newDate) {
    const start = newDate[0].getTime()
    const end = newDate[1].getTime()
    const range = end - start
    if (range > 48 * 60 * 60 * 1000) {
      ElMessage({
        showClose: true,
        message: 'The time span cannot exceed 24 hours',
        type: 'warning',
      })
      dateValue.value = dateValueSwapper
    } else {
      dateValueSwapper = newDate
    }
  }
}
function initialDateValue() {
  // 获取当前时间
  const now = new Date(dayjs(new Date()).format('YYYY-MM-DD HH:mm') + ':00')
  const before = new Date(now.getTime() - 12 * 60 * 60 * 1000)
  dateValue.value = [before, now]
}
initialDateValue()
onMounted(async () => {
  const route: Record<string, any> = useRoute()
  const data = route?.query?.tag
  selectValue.value = data
  if (selectValue.value) {
    await getFn()
  }
})
</script>
<style lang="scss" scoped>
.el-checkbox.el-checkbox--large {
  height: auto;
}
.my-select.el-select {
  width: 160px;
}
.my-select :deep(.el-select__wrapper) {
  background-color: transparent !important;
  color: #fff;
}
:deep(.el-select__placeholder) {
  color: #fff !important;
}
:deep(.el-select__input) {
  color: #fff !important;
}
</style>
