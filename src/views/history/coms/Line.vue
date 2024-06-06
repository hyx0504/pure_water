<template>
  <Echats :chartOption="chartOption" />
</template>
<script setup lang="ts">
import Echats from '@/components/Echats.vue'

const props = withDefaults(defineProps<{ chartData?: any | null }>(), {
  chartData: {
    haveData: false,
    isChecked: false,
  },
})
const name = ['predict_low', 'predict_up']
const chartOption = computed(() => {
  if (props.chartData.haveData) {
    let option = {}
    if (props.chartData.isChecked) {
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff',
            },
          },
          formatter: function (params: any) {
            let res = params[0].name
            for (let i = 0; i < params.length; i++) {
              let y = i
              i === 0 && (y = 1)
              i === 1 && (y = 0)
              let nameText = [0, 1].includes(y)
                ? name[y]
                : params[i]?.seriesName
              res += '<br>' + params[i]?.marker + nameText + '：'
              if (![null, '', undefined].includes(params[y]?.data)) {
                if (y === 1) {
                  res += (params[y]?.data + params[0]?.data).toFixed(6)
                } else {
                  res += params[y]?.data
                }
              } else {
                res += '-'
              }
            }
            return res
          },
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
          data: props.chartData.time,
        },
        yAxis: {
          type: 'value',
          max:
            Math.round(
              (props.chartData.maxData +
                (props.chartData.maxData - props.chartData.minData) * 0.1) *
                1000000,
            ) / 1000000,
          min:
            Math.round(
              (props.chartData.minData -
                (props.chartData.maxData - props.chartData.minData) * 0.1) *
                1000000,
            ) / 1000000,
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
          // 区间下限
          {
            type: 'line',
            stack: '区间',
            symbol: 'circle',
            symbolSize: 1,
            color: '#f2c0bf',
            lineStyle: {
              color: '#f2c0bf',
              width: 1,
            },
            data: props.chartData.min,
          },
          // 区间上限
          {
            type: 'line',
            stack: '区间',
            symbol: 'circle',
            symbolSize: 1,
            color: '#f2c0bf',
            lineStyle: {
              color: '#f2c0bf',
              width: 1,
            },
            areaStyle: {
              color: '#f7bdbd75',
            },

            data: props.chartData.range,
          },
          // 预测值
          {
            name: 'predict_mean',
            type: 'line',

            symbol: 'circle',
            symbolSize: 1,

            color: 'red',
            lineStyle: {
              color: 'red',
              width: 3,
            },

            data: props.chartData.preData,
          },
          // 真实值
          {
            name: 'real',
            type: 'line',

            symbol: 'circle',
            symbolSize: 1,
            color: '#4390ff',
            lineStyle: {
              color: '#4390ff',
              width: 3,
            },
            data: props.chartData.reality,
          },
        ],
      }
    } else {
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff',
            },
          },
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
          data: props.chartData.time,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'white',
          },
          max:
            Math.round(
              (props.chartData.maxData +
                (props.chartData.maxData - props.chartData.minData) * 0.1) *
                1000000,
            ) / 1000000,
          min:
            Math.round(
              (props.chartData.minData -
                (props.chartData.maxData - props.chartData.minData) * 0.1) *
                1000000,
            ) / 1000000,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#0d3e94',
            },
          },
          splitLine: { show: false },
        },
        series: [
          // 真实值
          {
            name: 'real',
            type: 'line',
            symbol: 'circle',
            symbolSize: 1,
            color: '#4390ff',
            lineStyle: {
              color: '#4390ff',
              width: 2,
            },
            data: props.chartData.reality,
          },
        ],
      }
    }
    return option
  } else {
    return {}
  }
})
</script>
