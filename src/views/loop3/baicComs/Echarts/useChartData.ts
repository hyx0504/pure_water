import { getHistoryData } from '@/request/history'
// import echartData from './echart.json'
export default async (params: {
  tag: string
  startTime: string
  endTime: string
}) => {
  let chartData = {}
  const { code, payload } = (await getHistoryData(params)) as any
  if (code === 200) {
    // const payload = echartData.payload
    const { time, trueData, range, min, preData, maxData, minData } = payload
    chartData = {
      haveData: time.length === 0 ? false : true,
      maxData,
      minData,
      isChecked: false,
      time,
      reality: trueData,
      range,
      min,
      preData,
    }
  } else {
    ElMessage({
      showClose: true,
      message: `Not ${params.tag}'s Data`,
      type: 'error',
    })
  }
  return chartData
}
