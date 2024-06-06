<template>
  <Echats :chartOption="chartOption" />
</template>
<script setup lang="ts">
import Echats from '@/components/Echats.vue'

const props = withDefaults(defineProps<{ chartData?: any | null }>(), {
  chartData: {
    haveData: false,
  },
})
const name = ['predict_low', 'predict_up']
// const neg = computed(() => {
//   return props.chartData.min.some((value) => value < 0)
// })
const chartOption = computed(() => {
  if (props.chartData.haveData) {
    const option = {
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
        formatter: function (params: any) {
          const paramArr = params.filter((f: any) => f.seriesName !== '区间差')
          let res = paramArr[0].name
          for (let i = 0; i < paramArr.length; i++) {
            let y = i
            i === 0 && (y = 1)
            i === 1 && (y = 0)
            let nameText = [0, 1].includes(y)
              ? name[y]
              : paramArr[i]?.seriesName
            res += '<br>' + paramArr[i]?.marker + nameText + '：'
            if (![null, '', undefined].includes(paramArr[y]?.data)) {
              if (y === 1) {
                res += paramArr[y]?.data
                // res += (params[y]?.data + params[0]?.data).toFixed(6)
              } else {
                res += paramArr[y]?.data
              }
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
        top: '10%',
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,

        axisLabel: {
          color: 'white',

          interval: 0, // 设置标签的间隔
          formatter: function (value: any, index: any) {
            if (
              [
                0,
                Math.round((props.chartData.time.length - 1) / 2),
                Math.round((props.chartData.time.length - 1) / 4),
                Math.round((props.chartData.time.length - 1) / 4) * 3,
                props.chartData.time.length - 1,
              ].includes(index)
            ) {
              return value.slice(-9)
            } else {
              return ''
            }
          },
        },
        axisLine: {
          lineStyle: {
            color: '#0d3e94',
          },
        },
        axisTick: { show: false },
        data: props.chartData.time,
      },
      yAxis: {
        type: 'value',
        max: props.chartData.maxData,
        // Math.round(
        //   (props.chartData.maxData +
        //     (props.chartData.maxData - props.chartData.minData) * 0.1) *
        //     10000,
        // ) / 10000,
        // props.chartData.maxData + Math.abs(props.chartData.minData),
        min: props.chartData.minData,
        // Math.round(
        //   (props.chartData.minData -
        //     (props.chartData.maxData - props.chartData.minData) * 0.1) *
        //     10000,
        // ) / 10000,

        minInterval: (props.chartData.maxData - props.chartData.minData) / 2,
        axisLabel: {
          color: 'white',

          formatter: function (value: any) {
            return value.toFixed(2)
          },
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
          name: 'predict_low',
          type: 'line',
          stack: '区间',
          symbol: 'circle',
          symbolSize: 1,
          color: '#f2c0bf',
          lineStyle: {
            color: '#f2c0bf',
            width: 1,
          },
          // areaStyle: {
          //   color: '#f7bdbd75',
          //   opacity: neg.value === true ? 0.5 : 0,
          // },
          data: props.chartData.min,
        },
        // 区间上限
        {
          name: 'predict_up',
          type: 'line',
          // stack: '区间',
          symbol: 'circle',
          symbolSize: 1,
          color: '#f2c0bf',
          lineStyle: {
            color: '#f2c0bf',
            width: 1,
          },
          // areaStyle: {
          //   color: '#f7bdbd75',
          // },

          data: props.chartData.range,
        },
        // 上下限区间差
        {
          name: '区间差',
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

          data: props.chartData.range.map(
            (m: any, i: number) => m - props.chartData.min[i],
          ),
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
            width: 2,
          },

          data: props.chartData.preData,
          markLine: {
            symbol: 'none',
            label: {
              show: false,
              padding: [0, 0, 5, 0],
              formatter() {
                return ''
              },
            },
            data: [
              {
                xAxis: 'average',
              },
            ],
            lineStyle: {
              width: 2,
              color: 'white',
            },
          },
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
            width: 2,
          },
          data: props.chartData.reality,
        },
      ],
    }
    return option
  } else {
    return {}
  }
})
</script>
