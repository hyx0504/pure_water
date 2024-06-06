<template>
  <Echats :chartOption="chartOption" />
</template>
<script setup lang="ts">
import Echats from '@/components/Echats.vue'
import * as echarts from 'echarts'
const props = withDefaults(defineProps<{ chartData?: any | null }>(), {
  chartData: {
    haveData: false,
  },
})
const color = {
  blue: '#0d3e94',
  yellow: '#aecb56',
  green: '#00d4c7',
}
const chartOption = computed(() => {
  if (props.chartData?.haveData) {
    const { max, min } = getMaxMin()

    const option = {
      tooltip: {
        trigger: 'axis',
        show: true,
        textStyle: {
          fontSize: 14,
        },
        formatter: function (params: any) {
          let res = params[0].name
          for (let i = 0; i < params.length; i++) {
            res += '<br>' + params[i].marker + params[i].seriesName + '：'
            if (![null, '', undefined].includes(params[i].data)) {
              res += params[i].data + '%'
            } else {
              res += '-'
            }
          }
          return res
        },
      },
      legend: {
        show: false,
        textStyle: { color: 'white' },
      },
      grid: {
        top: '13%',
        left: '7%',
        right: '7%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          color: 'white',
        },
        axisLine: {
          lineStyle: {
            color: '#0d3e94',
          },
        },
        data: props.chartData.xData,
      },
      yAxis: {
        type: 'value',
        name: '单位(%)',
        max: max,
        min: min,
        axisLabel: {
          color: 'white',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0d3e94',
          },
        },
        splitLine: { show: false },
      },
      series: [
        {
          name: 'MemoryUsage',
          type: 'line',
          stack: 'one',
          symbol: 'circle',
          symbolSize: 5,
          color: color.blue,
          lineStyle: {
            color: color.blue,
            width: 1,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(7,44,90,0.3)',
              },
              {
                offset: 1,
                color: 'rgba(0,146,246,0.9)',
              },
            ]),
          },

          data: props.chartData.data,
        },
      ],
      // dataZoom:
      //   props.chartData.xData.length > 12
      //     ? [
      //         {
      //           show: true,
      //           xAxisIndex: [0],
      //           height: 10,
      //           bottom: -3,
      //           showDetail: false,
      //           showDataShadow: false,
      //           borderColor: 'transparent',
      //           startValue: props.chartData.xData.length - 10,
      //           endValue: props.chartData.xData.length,
      //         },
      //         {
      //           type: 'inside',
      //           xAxisIndex: [0],
      //           zoomOnMouseWheel: false, //滚轮是否触发缩放
      //           moveOnMouseMove: true, //鼠标滚轮触发滚动
      //           moveOnMouseWheel: true,
      //         },
      //       ]
      //     : undefined,
    }
    return option
  } else {
    return {}
  }
})

function getMaxMin() {
  let max: null | number = null
  let min: null | number = null
  const { data } = props.chartData
  data.forEach((item: number) => {
    if (max === null) max = item
    else {
      if (max < item) max = item
    }
    if (min === null) min = item
    else {
      if (min > item) min = item
    }
  })
  if (max !== null) max = Math.round((10 + max) / 10) * 10
  if (min !== null) min = Math.round((min - 10) / 10) * 10
  if (min && min < 0) min = 0
  return { max, min }
}
</script>
