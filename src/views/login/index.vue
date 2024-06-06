<template>
  <div
    class="login-wrapper flex items-center justify-center w-screen h-screen bg-[#062D4E]"
  >
    <div
      class="w-40% h-full bg-[#05243E] color-white text-3rem flex items-center justify-center"
    >
      <div>Login</div>
    </div>
    <div class="w-60% h-full flex items-center justify-center">
      <div
        class="form-content relative flex justify-center flex-col z-1 w-110 h-115 pl-20 pr-20 box-border bg-white"
      >
        <div
          v-if="step"
          @click="step = 0"
          class="absolute top-4 left-4 flex items-center cursor-pointer"
        >
          <el-icon><i-ep-ArrowLeftBold /></el-icon>
          back
        </div>
        <div class="welcome-title">
          <p>Login to continue</p>
        </div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width=""
          class="demo-form"
        >
          <div v-show="step === 0">
            <el-form-item label="" prop="name">
              <el-input
                v-model.number="form.name"
                placeholder="Please enter account"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="w-full login-btn"
                :loading="loading"
                @click="step = 1"
              >
                continue
              </el-button>
            </el-form-item>
          </div>
          <div v-show="step === 1">
            <el-form-item label="" prop="password">
              <el-input
                @keyup.enter="submitForm(formRef)"
                v-model="form.password"
                type="password"
                placeholder="Please enter password"
                autocomplete="off"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <div class="w-full flex justify-between">
                <el-button
                  type="primary"
                  class="w-full login-btn"
                  :loading="loading"
                  @click="submitForm(formRef)"
                >
                  submit
                </el-button>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { encode } from 'js-base64'
import type { FormInstance, FormRules } from 'element-plus'
import { useTokenStore } from '@/stores/user'
import { useUserInfo } from '@/stores/user'
import { postLogin } from '@/request/user'
const { setToken } = useTokenStore()
const { setUserInfo } = useUserInfo()
const formRef = ref<FormInstance | null>(null)
const form = reactive({
  name: '',
  password: '',
})
const loading = ref(false)
const rules: FormRules = reactive({
  name: [
    {
      required: true,
      message: 'Account cannot be empty!',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password cannot be empty!',
      trigger: 'blur',
    },
  ],
})
const submitForm = (formEl: FormInstance | null) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login()
    } else {
      if (!form.name) {
        step.value = 0
      }
      return false
    }
  })
}
const route = useRoute()
const router = useRouter()
const step = ref(0)
const login = () => {
  const params = {
    ...form,
    password: encode(form.password),
  }
  loading.value = true
  postLogin(params)
    .then(async ({ code, payload, msg }: any) => {
      loading.value = false
      if (code === 200) {
        setToken(payload.token)
        delete payload.token
        setUserInfo({ ...payload })
        const { redirect, fullPath } = route.query as {
          redirect: string | undefined
          fullPath: string | undefined
        }

        // 页面跳转
        if (redirect) {
          return (location.href = redirect)
        } else if (fullPath) {
          return router.replace({
            path: fullPath,
            query: { ...route.query, fullPath: '' },
            // params: route.params,
          })
        } else {
          router.replace({
            path: '/',
          })
        }
      } else {
        ElMessage({
          showClose: true,
          message: msg || 'Login failed',
          type: 'error',
        })
      }
    })
    .catch(() => {
      loading.value = false
    })
  const { redirect, fullPath } = route.query as {
    redirect: string | undefined
    fullPath: string | undefined
  }

  // 页面跳转
  if (redirect) {
    return (location.href = redirect)
  } else if (fullPath) {
    return router.replace({
      path: fullPath,
      query: { ...route.query, fullPath: '' },
      // params: route.params,
    })
  } else {
    router.replace({
      path: '/',
    })
  }
}
</script>
<style lang="scss" scoped>
$height: 48px;
.form-content {
  border-radius: 6px 6px 6px 6px;
  .welcome-title {
    font-size: 24px;
    color: #2f5270;
    line-height: 36px;
    font-weight: 500;
    margin-bottom: 24px;
  }
}
.login-wrapper {
  :deep(.el-form-item) {
    margin-bottom: 24px;
  }
  .demo-form:deep(.el-input),
  .login-btn {
    height: $height !important;
    line-height: $height !important;
  }
  .demo-form:deep(.el-input) {
    .el-input__wrapper {
      --el-input-border-color: #0d3e94;
    }
  }
  :deep(.el-input__inner) {
    color: #424f5c;
  }
}
.el-checkbox {
  --el-checkbox-text-color: #677482;
}
</style>
