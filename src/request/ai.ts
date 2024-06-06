import tag_ai from './static/tag_ai.json'
import tag_convariance from './static/tag_convariance.json'
import tag_percent from './static/tag_percent.json'
import * as xlsx from 'xlsx'
import service from './index'
import { saveAs } from 'file-saver'

export const getTagAIData = () => {
  return tag_ai
}

export const getTagConvarianceData = () => {
  return tag_convariance
}
export const getTagPercentData = () => {
  return tag_percent
}
export const exportAIData = (
  excelName: string,
  sheetName: string,
  list: Record<string, any>[],
) => {
  const data = xlsx.utils.json_to_sheet(list)
  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, data, sheetName)

  const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  // 使用 FileSaver.js 或者浏览器原生的 a[download] 功能保存文件
  // 使用file-save主要解决xlsx在火狐浏览器的兼容性问题
  saveAs(blob, `${excelName}.xlsx`)
  // xlsx.writeFile(wb, `${excelName}.xlsx`)
}
export const getAIData = (data: {
  startTime: string
  endTime: string
  tag: string
  rate: number
}) =>
  service({
    url: `/dashboards/queryAIDashboard`,
    method: 'post',
    data,
  })

// New版本所需的接口
// -----------------------ai接口
export const getAIDataNew = (data: {
  page: string
  mode_type: string
  water_use_rate: number | null | string
  temperature: number | null | string
  pid_control: number | null | string
  ts_start: any
  ts_end: any
}) =>
  service({
    url: `http://192.168.32.2:8080/submit`,
    method: 'post',
    data,
  })
// ----------------------历史查询接口
export const getRealDataNew = (data: {
  aiLoop: string
  startTime: string
  endTime: string
}) =>
  service({
    url: `/dashboards/queryLoopAIData`,
    method: 'post',
    data,
  })
