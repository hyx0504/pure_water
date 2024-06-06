import service from './index'
import json from './static/tag_history.json'
import * as xlsx from 'xlsx'
export const getHistoryTrueData = (data: {
  startTime: string
  endTime: string
  tag: string
}) =>
  service({
    url: `/dashboards/queryHistoryDashboardTrueData`,
    method: 'post',
    data,
  })
export const getHistoryData = (data: {
  startTime: string
  endTime: string
  tag: string
}) =>
  service({
    url: `/dashboards/queryHistoryDashboard`,
    method: 'post',
    data,
  })
export const exportHistoryData = (
  excelName: string,
  sheetName: string,
  list: Record<string, any>[],
) => {
  const data = xlsx.utils.json_to_sheet(list)
  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, data, sheetName)
  xlsx.writeFile(wb, `${excelName}.xlsx`)
}

export const getTagData = () => {
  return json
}
