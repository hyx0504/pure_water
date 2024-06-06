<template>
  <el-dialog
    width="400px"
    title="Setting"
    v-model="handleVisible"
    @open="openDialog"
  >
    <el-form
      class="mt0"
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="140px"
      :inline="true"
    >
      <el-form-item
        label="Please select a time span"
        class="tips"
      ></el-form-item>
      <el-form-item class="time" label="">
        <el-select class="h-select" v-model="ruleForm.h">
          <el-option
            v-for="item in options1"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <span class="color-white px-4">:</span>
        <el-select class="h-select" v-model="ruleForm.m">
          <el-option
            v-for="(item, index) in options2"
            :key="index"
            :label="index"
            :value="index"
          />
        </el-select>
        <span class="color-white px-4">:</span>
        <el-select class="h-select" v-model="ruleForm.s">
          <el-option
            v-for="(item, index) in options2"
            :key="index"
            :label="index"
            :value="index"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="handleVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { FormInstance } from 'element-plus'
const props = defineProps(['handleVisible', 'addTime'])
const emit = defineEmits(['update:handle-visible', 'update:add-time'])
const handleVisible = useVModel(props, 'handleVisible', emit)
const handleTime = useVModel(props, 'addTime', emit)
const ruleFormRef = ref<FormInstance | null>(null)
const ruleForm = reactive({
  h: 0,
  m: 0,
  s: 0,
})
const options1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const options2 = new Array(61).fill(0)
const submit = () => {
  if (ruleForm.h === 12 && (ruleForm.m > 0 || ruleForm.s > 0)) {
    ElMessage({
      showClose: true,
      message: 'The maximum predicted range is 12 hours',
      type: 'error',
    })
  } else {
    handleTime.value = ruleForm.h * 60 * 60 + ruleForm.m * 60 + ruleForm.s
    handleVisible.value = false
  }
}
const openDialog = () => {
  // 拿time数据
  if (props.addTime) {
    ruleForm.h = Math.floor(props.addTime / (60 * 60))
    let remainingSeconds = props.addTime % (60 * 60)
    ruleForm.m = Math.floor(remainingSeconds / 60)
    ruleForm.s = remainingSeconds % 60
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';

.mt0 {
  margin-top: 0px;
}

.tips {
  color: $primary;
  :deep(.el-form-item__label) {
    color: inherit;
    font-size: 18px;
  }
}
.time {
  width: 100%;
  .h-select {
    --el-form-inline-content-width: 80px;
  }
}
</style>
