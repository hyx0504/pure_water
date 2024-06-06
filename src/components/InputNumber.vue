<script setup lang="ts">
/**
 * #透传封装ELInput=>InputNumber
 * 增加数字格式化
 */
function toNumber(text: string | number | null) {
  let string = String(text)
  if (
    !(
      [''].includes(string) ||
      ['.'].includes(string.slice(-1)) ||
      isNaN(Number(string))
    )
  ) {
    return Number(string.replace(/(\.\d{2})\d*/, '$1'))
  } else if (['.'].includes(string.slice(-1))) {
    return text
  } else {
    return 0
  }
}
</script>
<template>
  <el-input :formatter="(value: string | number | null) => toNumber(value)">
    <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-input>
</template>
