<!--
  弹窗组件: 重置密码弹框
 -->
<script setup>
import { useVModel } from '@vueuse/core'
import { encode } from 'js-base64'
import { postUpdate } from '@/request/user'
// 组件接口
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:isVisible'])
const dialogVisible = useVModel(props, 'isVisible', emits)
const title = 'password change'
const loading = ref(false)
const submit = async () => {
  // 密码确认
  if (!formPSWRef.value) return
  await formPSWRef.value.validate((valid) => {
    if (valid) {
      putPassword()
    } else {
      return false
    }
  })
}
// 密码修改form
const formPSWRef = ref()
// 自定义校验规则
const pswRule = (rule, value, callback) => {
  const PSWRule =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
  if (value === '') {
    callback(new Error('Please enter a new password!'))
  } else if (!PSWRule.test(value) & false) {
    callback(
      new Error(
        'The password must be at least 6 digits long, consisting of numbers, letters, and characters (@ $!% * #?&)',
      ),
    )
  } else {
    callback()
  }
}
const pswAgainRule = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter the new password again!'))
  } else if (value !== formPSW.value.newPassword) {
    callback(new Error('The two passwords do not match, please modify them!'))
  } else {
    callback()
  }
}
// rules
const formPSWRules = reactive({
  name: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input old password', trigger: 'blur' },
  ],
  newPassword: [
    {
      required: true,
      validator: pswRule,
      trigger: 'blur',
    },
  ],
  againPassword: [
    {
      required: true,
      validator: pswAgainRule,
      trigger: 'blur',
    },
  ],
})
const formPSW = ref({
  name: '',
  password: '',
  newPassword: '',
  againPassword: '',
})

// // 发送
const putPassword = async () => {
  const { name, password, newPassword } = formPSW.value
  const data = {
    name,
    password: encode(password),
    newPassword: encode(newPassword),
  }
  loading.value = true
  const { code } = await postUpdate(data)
  if (code === 200) {
    ElMessage({
      showClose: true,
      message: '修改成功！',
      type: 'success',
    })
    dialogVisible.value = false
  } else {
    ElMessage({
      showClose: true,
      message: '修改失败！',
      type: 'warning',
    })
  }
  loading.value = false
}

function openDialog() {
  formPSW.value = {
    name: '',
    password: '',
    newPassword: '',
    againPassword: '',
  }
}
</script>
<template>
  <el-dialog
    width="500px"
    :title="title"
    :close-on-click-modal="false"
    v-model="dialogVisible"
    @open="openDialog"
  >
    <el-form
      class="mt0"
      ref="formPSWRef"
      :model="formPSW"
      :rules="formPSWRules"
      label-width="150px"
      :inline="true"
    >
      <el-form-item label="username:" prop="name">
        <el-input
          v-model="formPSW.name"
          autocomplete="off"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="old password:" prop="password">
        <el-input
          v-model="formPSW.password"
          autocomplete="off"
          type="password"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="new password:" prop="newPassword">
        <el-input
          v-model="formPSW.newPassword"
          autocomplete="off"
          type="password"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="confirm password:" prop="againPassword">
        <el-input
          v-model="formPSW.againPassword"
          autocomplete="off"
          type="password"
          placeholder="Please input"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="giveUpBtn" @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" :loading="loading" @click="submit">
        OK
      </el-button>
    </template>
  </el-dialog>
</template>
