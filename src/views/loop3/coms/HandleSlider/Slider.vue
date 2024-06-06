<!-- 只是展示 点击弹窗设置时间 -->
<template>
  <div class="w-full h-full flex items-center">
    <div class="number-left">0h</div>
    <div class="show-line relative flex-1">
      <div class="show-slider" @click="handleVisible = true">+{{ text }}</div>
    </div>
    <div class="number-right">+12h</div>
    <Handle v-model:handle-visible="handleVisible" v-model:addTime="addTime" />
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import Handle from './Handle.vue'
const handleVisible = ref(false)
// 滑块
const addTime = ref(0) // 时间毫秒
const text = computed(() => {
  console.log(convertTime(addTime.value))
  return dayjs(new Date('2023/01/01 ' + convertTime(addTime.value))).format(
    'HH:mm:ss',
  )
}) // 展示信息
const lengthCSS = computed(() => {
  const length = Math.round((addTime.value / 43200) * 100) / 100

  return `calc(${length * 100}% - 3rem)`
})

function convertTime(seconds: number) {
  let hours = Math.floor(seconds / (60 * 60))
  let remainingSeconds = seconds % (60 * 60)
  let minutes = Math.floor(remainingSeconds / 60)
  remainingSeconds = remainingSeconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>
<style lang="scss" scoped>
$axis-color: #ff7a00;
$slider-color: #ffa800;
.number-left {
  margin-left: 1.5rem;
  width: 1.5rem;
  line-height: 3rem;
  height: calc(100% - 2rem);
  border-right: 0.3rem solid $axis-color;
}
.number-right {
  margin-right: 1.5rem;
  width: 1.5rem;
  line-height: 3rem;
  height: calc(100% - 2rem);
  border-left: 0.3rem solid $axis-color;
}
.show-line {
  border-top: 0.3rem solid $axis-color;
}
.show-slider {
  cursor: pointer;
  width: 6rem;
  height: 2.5rem;
  position: absolute;
  left: v-bind(lengthCSS);
  top: calc(50% - 1.4rem);
  background: $slider-color;
  border: 4px solid white;
  box-sizing: border-box;
  line-height: 2rem;
  text-align: center;
}
</style>
