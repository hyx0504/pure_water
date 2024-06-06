import service from './index'
// 颜色取值范围
export const getColorOptions = () =>
  service({
    url: `/dashboards/queryColorStatus`,
    method: 'get',
  })
export const setColorOptions = (data: any) =>
  service({
    url: `/dashboards/updateColorStatus`,
    method: 'post',
    data,
  })
