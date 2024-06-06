<template>
  <div class="show-container">
    <el-scrollbar
      view-class="w-full h-full flex flex-col  gap-1 justify-between"
    >
      <div class="show__title shrink-0 flex items-center text-1.2rem font-600">
        LOOP4 REALITY
      </div>
      <!-- loading -->
      <div
        class="show__card py-10 box-border w-full flex flex-wrap justify-between"
      >
        <div class="text-5 p-4">Loading</div>
        <div class="flex flex-col justify-center items-center">
          <div
            v-for="(item, index) in loadingOptions"
            :key="index"
            class="flex text-5"
          >
            <template v-if="item.label !== 'Rate'">
              <div class="w-30">{{ item.label }}</div>
              <div class="ml-4">
                {{
                  ![undefined, null].includes(item.value as any)
                    ? item.value + ' m³/h'
                    : ''
                }}
              </div>
            </template>
          </div>
        </div>
        <!-- Echarts -->
        <div class="h-10rem w-10rem mr-8">
          <Sector :value="loadingOptions[3].value" />
        </div>
      </div>

      <!-- tank -->
      <div
        class="p-4 py-6.5 show__card flex text-5 items-center justify-between"
      >
        <div>Tank</div>
        <div class="flex-1 flex ml-28%">
          <div class="flex">
            {{ tank.Tank1 }}
            <div>%</div>
          </div>
          <div class="flex ml-12">
            {{
              ![undefined, null].includes(tank.Tank2 as any)
                ? tank.Tank2 + ' mpa'
                : ''
            }}
          </div>
        </div>
      </div>
      <!-- temp -->
      <div class="p-4 py-6.5 show__card flex text-5">
        <div class="flex w-50% justify-between">
          <div>Temp</div>
          <div class="flex">
            {{ ![undefined, null].includes(temp as any) ? temp + ' °C' : '' }}
          </div>
        </div>

        <div class="flex w-50% px-20 justify-between">
          <div>PT</div>
          <div class="flex">
            {{ ![undefined, null].includes(pt as any) ? pt + ' Mpa' : '' }}
          </div>
        </div>
      </div>

      <!-- color bars -->
      <div
        :key="index"
        v-for="(item, index) in colorOptions"
        class="p-4 py-5 show__card flex text-5 items-center flex-wrap justify-between"
      >
        <div class="flex w-40% justify-between">
          <div>{{ item.label }}</div>
          <div>
            {{
              ![undefined, null].includes(
                colorDataNumbers[`${item.label.split('-')[0]}`] as any,
              )
                ? colorDataNumbers[`${item.label.split('-')[0]}`] +
                  ' ' +
                  item.unit
                : ''
            }}
          </div>
        </div>
        <div class="flex-1 h-full pl-4">
          <ColorBar
            :CSSOptions="colorBarsCSS[`${item.label.split('-')[0]}`]"
            :NumberOptions="colorBarsNumber[`${item.label.split('-')[0]}`]"
            :Number="colorDataNumbers[`${item.label.split('-')[0]}`]"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import useColorOptions from './useColorOptions.ts'
import WSClass from '@/request/websocket/websocket.js'
import useDataOptions from './useDataOptions.ts'
const loadingOptions = ref([
  { label: 'USE', value: '13.86' },
  { label: 'FIQT-672', value: '79.78' },
  { label: 'FIQT-662', value: '93.64' },
  { label: 'Rate', value: 14.8 },
])
const tank = ref({ Tank1: '84.97', Tank2: '0.30' })
const temp = ref('21.08')
const pt = ref('0.62')
const colorOptions = [
  { label: 'DNIT-662', unit: 'ppm' },
  { label: 'PTIL-662', unit: 'pcs/ml' },
  { label: 'TOCT-662', unit: 'ppb' },
  { label: 'SIO2T-662', unit: 'ppb' },
  { label: 'DOIT-662', unit: 'ppb' },
  { label: 'RIT-662', unit: 'MΩ.com' },
]

// 输入范围，内部计算百分比
const { colorBarsCSS, colorBarsNumber, colorDataNumbers } = useColorOptions()

let websocketTotal: any = null
const DataOptions = useDataOptions()
function getConnectWs() {
  websocketTotal && websocketTotal.close()
  const optionLine = {
    url: '/loopData',
    callback: getTotalData,
  }
  websocketTotal = new WSClass(optionLine)
}
function getTotalData(res: any) {
  const wsRuselt = res
  // Loading
  loadingOptions.value = [
    { label: 'USE', value: wsRuselt[DataOptions['USE']] },
    { label: 'FIQT-672', value: wsRuselt[DataOptions['FIQT-672']] },
    { label: 'FIQT-662', value: wsRuselt[DataOptions['FIQT-662']] },
    {
      label: 'Rate',
      value: wsRuselt[DataOptions['Rate']],
    },
  ]
  // Tank
  tank.value = {
    Tank1: wsRuselt[DataOptions['Tank1']],
    Tank2: wsRuselt[DataOptions['Tank2']],
  }
  // Temp
  temp.value = wsRuselt[DataOptions['Temp']]
  // PT
  pt.value = wsRuselt[DataOptions['PT']]
  // colorBars
  colorDataNumbers.value = {
    DNIT: wsRuselt[DataOptions['DNIT-662']],
    PTIL: wsRuselt[DataOptions['PTIL-662']],
    RIT: wsRuselt[DataOptions['RIT-662']],
    TOCT: wsRuselt[DataOptions['TOCT-662']],
    SIO2T: wsRuselt[DataOptions['SIO2T-662']],
    DOIT: wsRuselt[DataOptions['DOIT-662']],
  }
}
onMounted(() => {
  getConnectWs()
})
onBeforeUnmount(() => {
  websocketTotal.close()
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.show-container {
  width: 100%;
  height: 100%;
  background: $bg-color;
}
.show__title {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
  padding-left: 1rem;
  background: linear-gradient(
    90deg,
    rgba(28, 64, 93, 0.9) 0%,
    rgba(84, 147, 198, 0) 100%
  );
}
.show__card {
  background: $bg-container-color;
}
.none-select-user {
  /* 火狐 */
  -moz-user-select: none;
  /* Safari 和 欧朋 */
  -webkit-user-select: none;
  /* IE10+ and Edge */
  -ms-user-select: none;
  /* Standard syntax 标准语法(谷歌) */
  user-select: none;
}
</style>
