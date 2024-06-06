<template>
  <div class="w-50% flex flex-wrap">
    <div class="w-full">DNIT</div>
    <div class="flex items-center gap-1">
      <div class="bar-red w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.dnit_red_min"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.dnit_yellow_min"
      ></InputNumber>
      <div class="bar-white w-25"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.dnit_white"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.dnit_yellow_max"
      ></InputNumber>
      <div class="bar-red w-10"></div>
    </div>
    <div class="w-full">PTIL</div>
    <div class="flex items-center gap-1">
      <div class="bar-white w-75"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.ptil_white"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.ptil_yellow_max"
      ></InputNumber>
      <div class="bar-red w-10"></div>
    </div>
    <div class="w-full">TOCT</div>
    <div class="flex items-center gap-1">
      <div class="bar-white w-75"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.toct_white"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.toct_yellow_max"
      ></InputNumber>
      <div class="bar-red w-10"></div>
    </div>
    <div class="w-full">SiO2T</div>
    <div class="flex items-center gap-1">
      <div class="bar-white w-75"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.sio2_white"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.sio2_yellow_max"
      ></InputNumber>
      <div class="bar-red w-10"></div>
    </div>
    <div class="w-full">DOIT</div>
    <div class="flex items-center gap-1">
      <div class="bar-white w-75"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.doit_white"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.doit_yellow_max"
      ></InputNumber>
      <div class="bar-red w-10"></div>
    </div>
    <div class="w-full">RIT</div>
    <div class="flex items-center gap-1">
      <div class="bar-red w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.rit_red_min"
      ></InputNumber>
      <div class="bar-yellow w-10"></div>
      <InputNumber
        style="width: 3.3rem"
        v-model="formInline.rit_yellow_min"
      ></InputNumber>

      <div class="bar-white w-75"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
const props = defineProps<{ modelValue: any }>()
const emits = defineEmits(['update:modelValue'])
const formInline = useVModel(props, 'modelValue', emits, { deep: true })

// watchEffect(() => {
//   console.log(formInline, 'formInline')
// })
</script>
<style lang="scss" scoped>
.bar-white {
  position: relative;
  background: white;
  height: 2rem;
}

.bar-yellow {
  background: rgb(225, 225, 106);
  height: 2rem;
}

.bar-red {
  background: rgb(230, 65, 65);
  height: 2rem;
}
::v-deep(.el-input) {
  .el-input__wrapper {
    padding: 0 !important;
    .el-input__inner {
      text-align: center;
    }
  }
}
</style>
