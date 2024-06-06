import service from './index'
import axios from 'axios'
// 三个系统参数
export const getSystemData = () =>
  service({
    url: `/sys/getSystemData`,
    method: 'get',
  })

// HIM请求后端发生POST请求
export const initHmiPage = () =>
  service({
    url: `/sys/initHmiPage`,
    method: 'get',
  })

// 请求本地public
export const getPublicSetting = () => axios.get(`/config.json`)
