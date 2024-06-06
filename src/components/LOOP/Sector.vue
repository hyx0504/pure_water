<template>
  <Echats :chartOption="chartOption" />
</template>
<script setup lang="ts">
import Echats from '@/components/Echats.vue'
const prop = withDefaults(defineProps<{ value: any }>(), {
  value: 0,
})
const chartOption = computed(() => {
  let option = {}
  option = {
    title: {
      text: `${prop.value}%`,
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: 'white',
        fontSize: '20',
      },
    },
    color: ['rgba(176, 212, 251, 1)'],
    series: [
      {
        name: 'Line 1',
        type: 'pie',
        radius: ['60%', '90%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: '02',
            value: 100 - prop.value,
            itemStyle: {
              color: 'rgb(226, 232, 248)',
            },
          },
          {
            value: prop.value,
            name: '01',
            itemStyle: {
              color: '#4390ff',
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        ],
      },
    ],
  }

  console.log(option)
  return option
})
</script>
