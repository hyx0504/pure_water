<template>
  <div class="flex flex-wrap items-center justify-end">
    <el-button class="mr-12" type="primary" @click="getNowDate">Now</el-button>
    <div class="w-5rem">
      <el-time-picker
        :clearable="false"
        format="HH:mm"
        @change="nowDateChange"
        v-model="formValue.now"
      />
    </div>
    <div class="tip">Δt=</div>
    <div class="w-5rem mr-2">
      <el-input-number
        :min="60"
        :max="720"
        @change="() => futureDateChange()"
        controls-position="right"
        v-model="formValue.time"
      />
    </div>
    <div class="tip-unit">m</div>
    <div class="w-5rem ml-4 text-1.5rem">
      {{ dayjs(formValue.future).format('HH:mm') }}
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
const formValue = ref({
  now: new Date('2023-11-19 ' + dayjs(new Date()).format('HH:mm:ss')),
  time: 720,
  future: new Date(
    new Date('2023-11-19 ' + dayjs(new Date()).format('HH:mm:ss')).getTime() +
      720 * 60 * 1000,
  ),
})
let nowDateSwapper = new Date(
  '2023-11-19 ' + dayjs(new Date()).format('HH:mm:ss'),
)
function nowDateChange(newDate: any) {
  // 转换为毫秒时间戳
  const newDateValue = newDate.getTime()
  const nowDateValue = new Date(
    '2023-11-19 ' + dayjs(new Date()).format('HH:mm:ss'),
  ).getTime()
  if (newDateValue > nowDateValue) {
    ElMessage({
      showClose: true,
      message: 'The time cannot exceed the current time',
      type: 'warning',
    })
    formValue.value.now = nowDateSwapper
  } else {
    formValue.value.now = newDate
    futureDateChange()
    nowDateSwapper = newDate
  }
}
function futureDateChange() {
  formValue.value.future = new Date(
    formValue.value.now.getTime() + formValue.value.time * 60000,
  )
  postTimes()
}
function getNowDate() {
  formValue.value.now = new Date(
    '2023-11-19 ' + dayjs(new Date()).format('HH:mm:ss'),
  )
  futureDateChange()
}
const emits = defineEmits(['updataTime'])
function postTimes() {
  const startTime =
    dayjs(
      new Date(formValue.value.now.getTime() - formValue.value.time * 60000),
    ).format('YYYY-MM-DD HH:mm') + ':00'
  const endTime =
    dayjs(formValue.value.future).format('YYYY-MM-DD HH:mm') + ':00'
  emits('updataTime', startTime, endTime)
}
postTimes()
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.tip {
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-left: 1rem;
  &.tip-border {
    padding: 0.2rem 1rem;
    margin-right: 2.5rem;
    background: white;
    color: black;
  }
}
.tip-unit {
  font-size: 1.2rem;
  margin-right: 1.5rem;
}
</style>
