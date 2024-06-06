<template>
  <div class="route-page">
    <div class="container-card">
      <div class="flex items-center text-5">
        <el-icon color="#0d3e94">
          <i-ep-CaretRight />
        </el-icon>
        <span class="ml-1">HMI</span>
      </div>
      <div class="my-4 mx-6 flex items-center">
        <span class="text-4.5 mr-4">predict data:</span>
        <div class="w-70px">
          <el-select
            @change="savePredict"
            v-model="per_hour"
            placeholder=" "
            class="select border border-white border-solid"
          >
            <el-option
              v-for="(item, index) in hourOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <span class="ml-4">hours later</span>
      </div>
    </div>
    <div class="container-card">
      <div class="flex items-center text-5">
        <el-icon color="#0d3e94">
          <i-ep-CaretRight />
        </el-icon>
        <span class="ml-1">PREDICT MODEL</span>
      </div>
      <div class="my-4 mx-6">
        <el-select
          class="border border-white border-solid my-select"
          v-model="modelValue"
          @change="saveModel"
        >
          <el-option
            v-for="item in modelOptions"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="container-card">
      <div class="flex items-center text-5">
        <el-icon color="#0d3e94">
          <i-ep-CaretRight />
        </el-icon>
        <span class="ml-1 mr-4">AI Model</span>

        <el-button
          :loading="saveIsLoading"
          type="primary"
          @click="saveColorBarOptions"
        >
          save
        </el-button>
      </div>
      <div class="my-4 mx-6 mb-8">
        <ColorBarSetting v-model="colorBarSettingOptions" />
      </div>
    </div>
    <div class="container-card">
      <div class="flex items-center text-5">
        <el-icon color="#0d3e94">
          <i-ep-CaretRight />
        </el-icon>
        <span class="ml-1">USER</span>
      </div>
      <div class="my-4 mx-6">
        <el-button type="primary" @click="isVisiblePWSDialog = true">
          password change
        </el-button>
        <el-button type="primary" @click="logout">Log out</el-button>
      </div>
    </div>
    <PSWDialog v-model:is-visible="isVisiblePWSDialog" />
  </div>
</template>
<script setup lang="ts">
import { clearInfo } from '@/utils/index'
import ColorBarSetting from './coms/ColorBarSetting.vue'
import PSWDialog from './coms/PSWDialog.vue'
import {
  getQueryPreTime,
  postSetPreTime,
  getModelConf,
  getQueryModelConf,
} from '@/request/user'
import { getColorOptions, setColorOptions } from '@/request/loop'
import useValidate from './coms/useValidate'
const colorBarSettingOptions = ref({})
const saveIsLoading = ref(false)
const per_hour = ref('')
const hourOptions = [2, 4, 6, 8, 10, 12]
const modelOptions = ref([
  { label: 'MLP', value: 'MLP' },
  { label: 'TIDE', value: 'TIDE' },
])
const modelValue = ref('')
// 登出
const router = useRouter()
const logout = () => {
  ElMessageBox({
    title: 'Log out',
    message: 'Confirm logging out?',
    showCancelButton: true,
    confirmButtonText: 'yes',
    cancelButtonText: 'no',
    type: 'warning',
  }).then(() => {
    clearInfo()
    router.push({ name: 'login' })
  })
}

// 保存
const savePredict = async () => {
  if (typeof per_hour.value !== 'string') {
    const { code } = (await postSetPreTime({
      preTime: per_hour.value,
    })) as any
    if (code === 200) {
      ElMessage({
        showClose: true,
        message: 'Set successfully',
        type: 'success',
      })
    } else {
      ElMessage({
        showClose: true,
        message: 'Setting failed',
        type: 'warning',
      })
    }
  }
}
const saveModel = async () => {
  const params = {
    mode: modelValue.value,
  }
  const { code } = (await getModelConf(params)) as any
  if (code === 200) {
    ElMessage({
      showClose: true,
      message: 'Set successfully',
      type: 'success',
    })
  } else {
    ElMessage({
      showClose: true,
      message: 'Setting failed',
      type: 'warning',
    })
  }
}
const saveColorBarOptions = async () => {
  saveIsLoading.value = true
  const paramsData = JSON.parse(JSON.stringify(colorBarSettingOptions.value))
  convertObjPropsToNumbers(paramsData)
  // 校验
  if (useValidate(paramsData)) {
    const { code } = (await setColorOptions(paramsData)) as any
    if (code === 200) {
      ElMessage({
        showClose: true,
        message: 'save successfully',
        type: 'success',
      })
    }
  }
  saveIsLoading.value = false
}
const isVisiblePWSDialog = ref(false)
// 预测时间
onMounted(async () => {
  // const { code: code1, payload: payload1 } = {
  //   code: 200,
  //   msg: 'Success',
  //   payload: {
  //     dint_white: '8-18',
  //     ptil_white: '0-0.1',
  //     toc_white: '0-0.65',
  //     sio2_white: '0-0.18',
  //     rit_white: '18.12-18.5',
  //     do_white: '0-0.4',
  //     dint_yellow: '6-8;18-20',
  //     dint_red: '4-6;20-22',
  //     ptil_red: '1.0-2.0',
  //     ptil_yellow: '0.1-1.0',
  //     toc_red: '1.0-2.0',
  //     toc_yellow: '0.65-1.0',
  //     sio2_red: '0.3-0.6',
  //     sio2_yellow: '0.18-0.3',
  //     rit_yellow: '18.1-18.12',
  //     rit_red: '18-18.1',
  //     do_red: '1.0-2.0',
  //     do_yellow: '0.4-1.0',
  //   },
  // }
  // if (code1 === 200) {
  //   colorBarSettingOptions.value = payload1
  //   console.log(colorBarSettingOptions.value, 'colorBarSettingOptions.value')
  // }
  const { code, payload } = (await getQueryPreTime()) as any
  if (code === 200) {
    per_hour.value = payload
  }
  const { code: code1, payload: payload1 } = (await getColorOptions()) as any
  if (code1 === 200) {
    colorBarSettingOptions.value = payload1
  }
  const { code: code2, payload: payload2 } = (await getQueryModelConf()) as any
  if (code2 === 200) {
    if (payload2.mode === '') {
      modelValue.value = modelOptions.value[0].value
    } else {
      modelValue.value = payload2.mode
    }
  }
})
// 将对象属性转换为数字类型的方法
function convertObjPropsToNumbers(object: any) {
  Object.keys(object).forEach((prop) => {
    object[prop] = parseFloat(object[prop])
  })
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.container-card {
  background: $bg-container-color;
  padding: 4px;
  padding-top: 1rem;
  & + .container-card {
    margin-top: 1rem;
  }
}
.my-select.el-select {
  width: 120px;
}
.my-select :deep(.el-select__wrapper) {
  background-color: transparent !important;
  color: #fff;
}
.select :deep(.el-select__wrapper) {
  background-color: transparent !important;
  color: #fff;
}
:deep(.el-select__placeholder) {
  color: #fff !important;
}
</style>
