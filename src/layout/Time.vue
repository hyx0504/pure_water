<template>
  <div class="text-white flex flex-col items-center m-4">
    <div class="mb-2">{{ time }}</div>
    <div>{{ date }}</div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
const time = ref<string | null>(null)
const date = ref<string | null>(null)
const getDataTime = () => {
  date.value = dayjs(new Date()).format('YYYY/MM/DD')
  time.value = dayjs(new Date()).format('HH:mm:ss')
}
// 开启一个一秒钟的定时器
getDataTime()
setInterval(getDataTime, 1000)
</script>
<style lang="scss" scoped></style>
