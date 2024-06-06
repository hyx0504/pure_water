import service from './index'
// 登录
export const postLogin = (data: { name: string; password: string }) =>
  service({
    url: `/user/login`,
    method: 'post',
    data,
  })
// 更改密码
export const postUpdate = (data: {
  name: string
  password: string
  newPassword: string
}) =>
  service({
    url: `/user/update`,
    method: 'post',
    data,
  })

// 查询预测时间
export const getQueryPreTime = () =>
  service({
    url: `/sys/queryPreTime`,
    method: 'get',
  })
// 设置预测时间
export const postSetPreTime = (data: { preTime: number }) =>
  service({
    url: `/sys/setPreTime`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })

// 查询初始化模型频型
export const getQueryModelConf = () =>
  service({
    url: `/sys/getModeConf`,
    method: 'get',
  })
// 设置模型频型
export const getModelConf = (params: { mode: string }) =>
  service({
    url: `/sys/setModeConf`,
    method: 'get',
    params,
  })
