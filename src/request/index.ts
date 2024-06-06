import axios from 'axios'
import router from '@/router/index'
import { clearInfo } from '@/utils/index'
import $config from '@/config'

// 创建axios实例
const isDev = import.meta.env.MODE === 'development'

// const baseURL = isDev ? '/api/scada' : window.Glob.JAVA_SERVER_URL
const baseURL = $config.baseUrl
const service = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] =
      window.localStorage.getItem('token') == null
        ? null
        : window.localStorage.getItem('token')
    config.headers['Factory'] = window.sessionStorage.getItem('factory') || null

    const key = config.method === 'get' ? 'params' : 'data'
    config[key] = config[key] || {}
    if (
      Object.prototype.toString.call(config[key]) === '[object Object]' &&
      Object.keys(config[key]).length === 0
    )
      delete config[key]
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

service.interceptors.response.use(
  (response) => {
    if ([4001, 401].includes(response.data.code)) {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      console.log(response.data, 'response.data')
      ElMessage({
        showClose: true,
        message: response.data.errorMessage || 'Not logged in or token expired',
        type: 'error',
      })
      clearInfo()
      router.replace({
        name: 'login',
        query: {
          fullPath: location.pathname,
          ...router.currentRoute.value.query,
        },
        params: router.currentRoute.value.params,
      })

      return response.data
    }
    if (response.request?.responseType === 'blob') {
      return response
    }
    return response.data
  },
  (err) => {
    const res = err.response
    let msg = res?.error
    switch (res && res.status) {
      case 401:
        msg = 'Not logged in or token expired'
        break
      case 403:
        msg = 'No permission'
        break
      case 500:
        msg = 'Server error'
        break
      case 404:
        msg = 'Interface not found'
        break
    }
    if (
      Object.prototype.toString.call(err) === '[object Error]' &&
      err.code === 'ECONNABORTED'
    ) {
      msg = 'request timeout'
    }
    if (msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
      })
    }
    // 返回接口返回的错误信息
    return Promise.reject(err?.response?.data || err)
  },
)

export default service
