<template>
  <div class="relative w-full h-2.5rem flex justify-center items-center">
    <!-- 红色 -->
    <div class="bar-red0 relative" v-if="barOptions.red0 !== '0%'">
      <span class="number_slider color-[#e64141]">
        {{ NumberOptions.red1 }}
      </span>
      <div
        v-if="barPostions.isShow === 'red_0'"
        class="border_slider_red_0"
      ></div>
    </div>
    <!-- 黄色 -->
    <div class="bar-yellow0 relative" v-if="barOptions.yellow0 !== '0%'">
      <span class="number_slider color-[#e1e16a]">
        {{ NumberOptions.yellow2 }}
      </span>
      <div
        v-if="barPostions.isShow === 'yellow_0'"
        class="border_slider_yellow_0"
      ></div>
    </div>
    <!-- 白色 -->
    <div class="bar-white relative">
      <span class="number_slider" v-if="barOptions.yellow1 !== '0%'">
        {{ NumberOptions.white3 }}
      </span>
      <div
        v-if="barPostions.isShow === 'white'"
        class="border_slider_white"
      ></div>
    </div>
    <!-- 黄色 -->
    <div class="bar-yellow1 relative" v-if="barOptions.yellow1 !== '0%'">
      <span class="number_slider color-[#e1e16a]">
        {{ NumberOptions.yellow4 }}
      </span>
      <div
        v-if="barPostions.isShow === 'yellow_1'"
        class="border_slider_yellow_1"
      ></div>
    </div>
    <!-- 红色 -->
    <div class="bar-red1 relative" v-if="barOptions.red1 !== '0%'">
      <div
        v-if="barPostions.isShow === 'red_1'"
        class="border_slider_red_1"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 接收
const props = defineProps<{
  CSSOptions: any
  NumberOptions: any
  Number: any
}>()
const barOptions = computed(() => {
  if (props.CSSOptions) {
    const { red0, yellow0, white, yellow1, red1 } = props.CSSOptions
    const length = red0 + yellow0 + white + yellow1 + red1
    if (length === 0)
      return {
        red0: '0%',
        yellow0: '0%',
        white: '0%',
        yellow1: '0%',
        red1: '0%',
      }
    return {
      red0: Math.round((red0 / length) * 100) + '%',
      yellow0: Math.round((yellow0 / length) * 100) + '%',
      white: Math.round((white / length) * 100) + '%',
      yellow1: Math.round((yellow1 / length) * 100) + '%',
      red1: Math.round((red1 / length) * 100) + '%',
    }
  } else {
    return { red0: '0%', yellow0: '0%', white: '0%', yellow1: '0%', red1: '0%' }
  }
})

const barPostions = computed(() => {
  /**
   * 1. 先归类所在范围比前面大比后面小
   * red_0,yellow_0,white,yellow_1,red_1
   * 2. 如果在white,求%
   */
  let isShow = 'white'
  let percent = '50%'
  // 红0
  if (
    props.Number < props.NumberOptions.red1 &&
    props.CSSOptions.red0 !== '0%'
  ) {
    isShow = 'red_0'
  }
  // 黄0
  else if (
    props.Number < props.NumberOptions.yellow2 &&
    props.CSSOptions.yellow0 !== '0%'
  ) {
    isShow = 'yellow_0'
  }
  // 白
  else if (props.Number <= props.NumberOptions.white3) {
    isShow = 'white'
    percent =
      Math.round(
        ((props.Number - props.NumberOptions.yellow2) /
          (props.NumberOptions.white3 - props.NumberOptions.yellow2)) *
          100,
      ) + '%'
  }
  // 黄1
  else if (
    props.Number <= props.NumberOptions.yellow4 &&
    props.CSSOptions.yellow1 !== '0%'
  ) {
    isShow = 'yellow_1'
  }
  // 红1
  else if (
    props.NumberOptions.yellow4 < props.Number &&
    props.CSSOptions.red1 !== '0%'
  ) {
    isShow = 'red_1'
  }
  // 白
  else {
    isShow = 'white'
    percent = '100%'
  }
  return {
    isShow,
    percent,
  }
})
</script>
<style lang="scss" scoped>
.bar-white {
  position: relative;
  background: white;
  width: v-bind('barOptions.white');
  height: 100%;
}

.bar-yellow0 {
  background: #e1e16a;
  width: v-bind('barOptions.yellow0');
  height: 100%;
}

.bar-red0 {
  background: #e64141;
  width: v-bind('barOptions.red0');
  height: 100%;
}

.bar-yellow1 {
  background: rgb(225, 225, 106);
  width: v-bind('barOptions.yellow1');
  height: 100%;
}

.bar-red1 {
  background: rgb(230, 65, 65);
  width: v-bind('barOptions.red1');
  height: 100%;
}

.number_slider {
  position: absolute;
  right: -0px;
  font-size: 16px;
  top: -18px;
  transform: translate(50%, 0%);
}

.border_slider_red_0 {
  position: absolute;
  height: 2.2rem;
  left: 50%;
  border: 3px solid black;
}

.border_slider_yellow_0 {
  position: absolute;
  height: 2.2rem;
  left: 50%;
  border: 3px solid black;
}

.border_slider_white {
  position: absolute;
  height: 2.2rem;
  left: v-bind('barPostions.percent');
  border: 3px solid black;
}

.border_slider_yellow_1 {
  position: absolute;
  height: 2.2rem;
  left: 50%;
  border: 3px solid black;
}

.border_slider_red_1 {
  position: absolute;
  height: 2.2rem;
  left: 50%;
  border: 3px solid black;
}
</style>
