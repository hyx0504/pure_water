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
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        textStyle: { color: 'white' },
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '5%',
        bottom: '3%',
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
        data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      },
      yAxis: {
        type: 'value',
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
          name: '蓝色',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
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

          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        },
        {
          name: '绿色',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,

          color: color.green,
          lineStyle: {
            color: color.green,
            width: 1,
          },
          areaStyle: {
            //color: '#94C9EC'
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(7,44,90,0.3)',
              },
              {
                offset: 1,
                color: 'rgba(0,212,199,0.9)',
              },
            ]),
          },
          data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
        },
        {
          name: '橙色',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 1,
          color: color.yellow,
          lineStyle: {
            color: color.yellow,
            width: 1,
          },
          areaStyle: {
            //color: '#94C9EC'
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(7,44,90,0.3)',
              },
              {
                offset: 1,
                color: 'rgba(114,144,89,0.9)',
              },
            ]),
          },
          data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190],
        },
      ],
    }
    return option
  } else {
    return {}
  }
})
</script>
