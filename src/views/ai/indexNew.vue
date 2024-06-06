<template>
  <div class="route-page flex flex-col gap-4">
    <!-- 操作栏 -->
    <div
      class="box-border p-4 flex flex-wrap items-center justify-between bg-[#18293b] gap-4"
    >
      <div class="flex items-center">
        <el-select
          class="border border-white border-solid my-select"
          v-model="modelValue"
        >
          <el-option
            v-for="item in TagModelOptions"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center">
          <div class="w-66 flex items-center">
            <!-- <el-date-picker
              :clearable="false"
              v-model="dateValue"
              @change="dateChangeFn"
              type="datetime"
              range-separator="To"
              format="YYYY/MM/DD HH:mm"
              start-placeholder="Start date"
              end-placeholder="End date"
              :disabledDate="disabledDateFun"
            /> -->
            <el-date-picker
              v-model="dateValue"
              type="date"
              placeholder="Pick a day"
              @change="changeDay"
              :clearable="false"
            />
            <el-time-select
              v-model="timeValue"
              style="width: 180px"
              :start="startTime"
              step="00:10"
              :end="endTime"
              placeholder="Select time"
              format="HH:mm "
              class="time-select"
              :clearable="false"
            />
          </div>
          <span class="text-1.2rem mx-3">Δ 720m</span>
        </div>

        <div class="flex">
          <el-button type="primary" @click="getFn" :loading="isSearchLoading">
            Inquire
          </el-button>
          <el-button plain @click="exportFn">Export</el-button>
        </div>
      </div>
    </div>
    <!-- 内容展示 -->
    <div class="flex-1 min-h-0 w-full flex flex-row justify-between">
      <!-- 左侧部分 -->
      <div
        class="w-[49.5%] box-border flex flex-col justify-between"
        v-loading="leftloading"
      >
        <div class="h-[25%] bg-[#18293b] flex flex-col mb-2 overflow-y-auto">
          <p class="w-full text-center text-1.2rem font-600">
            AI Model with control variable
          </p>
          <div class="w-full flex-1 flex justify-between">
            <div class="w-[43%]">
              <table class="w-full h-full text-1rem" style="border-spacing: 0">
                <tr>
                  <td class="font-bold">Water volume use rate</td>
                  <td>
                    <el-input
                      style="width: 90px"
                      v-model="waterUseRate"
                      class="font-bold"
                    ></el-input>
                    <span class="whitespace-pre">{{ '  %' }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">Temperature</td>
                  <td>
                    <el-input
                      style="width: 90px"
                      v-model="temperature"
                      class="font-bold"
                    ></el-input>
                    <span class="whitespace-pre">{{ '  ℃' }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">PID controller</td>
                  <td>
                    <el-input
                      style="width: 90px"
                      v-model="pidControl"
                      class="font-bold"
                    ></el-input>
                    <span class="whitespace-pre">{{ '  Mpa' }}</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="w-[56.5%] flex justify-between items-center">
              <table class="w-[65%] text-1rem" style="border-spacing: 0">
                <tr>
                  <td>Tank</td>
                  <td class="text-right">
                    {{ leftControlVariable?.tankRate ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' %' }}</td>
                  <td class="whitespace-pre">
                    {{ leftControlVariable?.tankMpa ?? '--' }}{{ ' Mpa' }}
                  </td>
                </tr>
                <tr>
                  <td>USE</td>
                  <td class="text-right">
                    {{ leftControlVariable?.useValue ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_1 }}</td>
                  <td class="text-right">
                    {{ leftControlVariable?.FIQT_1 ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_2 }}</td>
                  <td class="text-right">
                    {{ leftControlVariable?.FIQT_2 ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopPvc }}</td>
                  <td class="text-right">
                    {{ leftControlVariable?.pcvValue ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' %' }}</td>
                </tr>
              </table>
              <!-- <Echats class="flex-1" :chart-option="pieOptions" /> -->
              <Sector
                class="flex-1"
                :value="leftControlVariable?.water_use_rate ?? 0"
              />
            </div>
          </div>
        </div>
        <el-scrollbar view-class="flex-1 flex flex-wrap gap-1">
          <div class="container_swapper">
            <Echats
              key="0"
              :label="modelValue === 'LOOP3' ? 'TT-661' : 'TT-662'"
              value="℃"
              :chart-data="aiChartDatas[0]"
            />
            <Echats
              key="1"
              :label="modelValue === 'LOOP3' ? 'PT-661' : 'PT-662'"
              value="mpa"
              :chart-data="aiChartDatas[1]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              key="2"
              :label="modelValue === 'LOOP3' ? 'DNIT-661' : 'DNIT-662'"
              value="ppb"
              :chart-data="aiChartDatas[2]"
            />
            <Echats
              key="3"
              :label="modelValue === 'LOOP3' ? 'PTIL-661' : 'PTIL-662'"
              value="pcs/ml"
              :chart-data="aiChartDatas[3]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              key="4"
              :label="modelValue === 'LOOP3' ? 'TOCT-661' : 'TOCT-662'"
              value="ppb"
              :chart-data="aiChartDatas[4]"
            />
            <Echats
              key="5"
              :label="modelValue === 'LOOP3' ? 'SiO2T-661' : 'SiO2T-662'"
              value="ppb"
              :chart-data="aiChartDatas[5]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              class="mb-4"
              key="6"
              :label="modelValue === 'LOOP3' ? 'DOIT-661' : 'DOIT-662'"
              value="ppb"
              :chart-data="aiChartDatas[6]"
            />
            <Echats
              class="mb-4"
              key="7"
              :label="modelValue === 'LOOP3' ? 'RIT-661' : 'RIT-662'"
              value="MΩ.cm"
              :chart-data="aiChartDatas[7]"
            />
          </div>
        </el-scrollbar>
      </div>
      <!-- 右侧部分 -->
      <div
        class="w-[49.5%] box-border flex flex-col justify-between"
        v-loading="rightloading"
      >
        <div class="h-[25%] bg-[#18293b] flex flex-col mb-2 overflow-y-auto">
          <p class="w-full text-center text-1.2rem font-600">
            AI Model without control variable
          </p>
          <div class="w-full flex-1 flex justify-between">
            <div class="w-[43%]">
              <table class="w-full h-full text-1rem">
                <tr>
                  <td class="font-bold">Water volume use rate</td>
                  <td class="text-right">
                    <span class="font-bold">
                      {{ rightControlVariable?.use_rate ?? '--' }}
                    </span>
                  </td>
                  <td class="whitespace-pre">{{ ' %' }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Temperature</td>
                  <td class="text-right">
                    <span class="font-bold">
                      {{ rightControlVariable?.temperature ?? '--' }}
                    </span>
                  </td>
                  <td class="whitespace-pre">
                    {{ ' ℃' }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">PID controller</td>
                  <td class="text-right">
                    <span class="font-bold">
                      {{ rightControlVariable?.pid_controller ?? '--' }}
                    </span>
                  </td>
                  <td class="whitespace-pre">{{ ' Mpa' }}</td>
                </tr>
              </table>
            </div>
            <div class="w-[56.5%] flex justify-between items-center">
              <!-- <table class="w-[68%] text-1rem">
                <tr>
                  <td>Tank</td>
                  <td>{{ rightControlVariable?.tankRate ?? '--' }}%</td>
                  <td>{{ rightControlVariable?.tankMpa ?? '--' }}Mpa</td>
                </tr>
                <tr>
                  <td>USE</td>
                  <td>{{ rightControlVariable?.useValue ?? '--' }}m³/h</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_1 }}</td>
                  <td>{{ rightControlVariable?.FIQT_1 ?? '--' }}m³/h</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_2 }}</td>
                  <td>{{ rightControlVariable?.FIQT_2 ?? '--' }}m³/h</td>
                </tr>
                <tr>
                  <td>{{ loopPvc }}</td>
                  <td>{{ rightControlVariable?.pcvValue ?? '--' }}%</td>
                </tr>
              </table> -->
              <table class="w-[65%] text-1rem" style="border-spacing: 0">
                <tr>
                  <td>Tank</td>
                  <td class="text-right">
                    {{ rightControlVariable?.tankRate ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' %' }}</td>
                  <td class="whitespace-pre">
                    {{ rightControlVariable?.tankMpa ?? '--' }}{{ ' Mpa' }}
                  </td>
                </tr>
                <tr>
                  <td>USE</td>
                  <td class="text-right">
                    {{ rightControlVariable?.useValue ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_1 }}</td>
                  <td class="text-right">
                    {{ rightControlVariable?.FIQT_1 ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopFIQT_2 }}</td>
                  <td class="text-right">
                    {{ rightControlVariable?.FIQT_2 ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' m³/h' }}</td>
                </tr>
                <tr>
                  <td>{{ loopPvc }}</td>
                  <td class="text-right">
                    {{ rightControlVariable?.pcvValue ?? '--' }}
                  </td>
                  <td class="whitespace-pre">{{ ' %' }}</td>
                </tr>
              </table>
              <!-- <Echats class="flex-1" :chart-option="pieOptions" /> -->
              <Sector
                class="flex-1"
                :value="rightControlVariable?.pieValue ?? 0"
              />
            </div>
          </div>
        </div>
        <el-scrollbar view-class="flex-1 flex flex-wrap gap-1">
          <div class="container_swapper">
            <Echats
              key="01"
              :label="modelValue === 'LOOP3' ? 'TT_661' : 'TT_662'"
              value="℃"
              :chart-data="realChartDatas[0]"
            />
            <Echats
              key="11"
              :label="modelValue === 'LOOP3' ? 'PT-661' : 'PT-662'"
              value="mpa"
              :chart-data="realChartDatas[1]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              key="21"
              :label="modelValue === 'LOOP3' ? 'DNIT-661' : 'DNIT-662'"
              value="ppb"
              :chart-data="realChartDatas[2]"
            />
            <Echats
              key="31"
              :label="modelValue === 'LOOP3' ? 'PTIL-661' : 'PTIL-662'"
              value="pcs/ml"
              :chart-data="realChartDatas[3]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              key="41"
              :label="modelValue === 'LOOP3' ? 'TOCT-661' : 'TOCT-662'"
              value="ppb"
              :chart-data="realChartDatas[4]"
            />
            <Echats
              key="51"
              :label="modelValue === 'LOOP3' ? 'SiO2T-661' : 'SiO2T-662'"
              value="ppb"
              :chart-data="realChartDatas[5]"
            />
          </div>
          <div class="container_swapper">
            <Echats
              class="mb-4"
              key="61"
              :label="modelValue === 'LOOP3' ? 'DOIT-661' : 'DOIT-662'"
              value="ppb"
              :chart-data="realChartDatas[6]"
            />
            <Echats
              class="mb-4"
              key="71"
              :label="modelValue === 'LOOP3' ? 'RIT-661' : 'RIT-662'"
              value="MΩ.cm"
              :chart-data="realChartDatas[7]"
            />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { getTagConvarianceData } from '@/request/ai'
import { useRefState } from '@/hooks/useState'
import Echats from './coms/Echarts.vue'
import { getAIDataNew, getRealDataNew, exportAIData } from '@/request/ai'
import { getQueryModelConf } from '@/request/user'
// import mockAiData from './ai.json'
// import mockRealData from './xxx.json'
/**
 * #下拉控制
 */

interface RealFilterDataType {
  [key: string]: any
}
interface AiChartDatasType {
  haveData: boolean
  maxData: number
  minData: number
  isChecked: false
  time: string[]
  reality: number[] //蓝色线 实际值
  range: number[] // 上限
  min: number[]
  preData: number[] // 红色线 预测值
  markLineData: string
  label: string
  unit: string
  lowRange: number[]
}

const loopFIQT_1 = computed(() => {
  return modelValue.value === 'LOOP3' ? 'FIQT_671' : 'FIQT_672'
})
const loopFIQT_2 = computed(() => {
  return modelValue.value === 'LOOP3' ? 'FIQT_661' : 'FIQT_662'
})
const loopPvc = computed(() => {
  return modelValue.value === 'LOOP3' ? 'PCV_671B' : 'PCV_672B'
})
const TagConvarianceOptions = ref<Record<string, any>[] | null>(null)
TagConvarianceOptions.value = getTagConvarianceData()
const TagModelOptions = ref<Record<string, any>[]>([
  { value: 'LOOP3', label: 'LOOP3' },
  { value: 'LOOP4', label: 'LOOP4' },
])
const modelValue = ref(TagModelOptions.value[0].value)
const modeType = ref('') // 模型频型
const aiChartDatas = ref<Partial<AiChartDatasType>[]>([
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
])
const realChartDatas = ref<Partial<AiChartDatasType>[]>([
  {
    // haveData: true,
    // maxData: 60,
    // minData: 10,
    // isChecked: false,
    // time: ['07:00:00', '19:00:00', '07:00:00'],
    // reality: [11, 12, 15], //蓝色线 实际值
    // range: [12, 55, 17], // 上限
    // min: 0,
    // preData: [20, 33, 44], // 红色线 预测值
    // markLineData: '19:00:00',
    // label: '',
    // unit: '',
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
])
const [leftloading, setLeftLoading] = useRefState<boolean>(false)
const [rightloading, setRightLoading] = useRefState<boolean>(false)
const rightControlVariable = ref<{
  use_rate?: number | string
  temperature?: number | string
  pid_controller?: number | string
  tankRate: number | string | undefined
  tankMpa: number | string | undefined
  useValue: number | string
  FIQT_1: number | string | undefined
  FIQT_2: number | string | undefined
  pcvValue: number | string | undefined
  pieValue: number | string | undefined
} | null>(null)
const leftControlVariable = ref<{
  tankRate: number | string | undefined
  tankMpa: number | string | undefined
  useValue: number | string
  FIQT_1: number | string | undefined
  FIQT_2: number | string | undefined
  pcvValue: number | string | undefined
  water_use_rate: number | string | undefined
} | null>(null)
const realFilterData = ref<RealFilterDataType>({})
const waterUseRate = ref<number | null | string>('')
const temperature = ref<number | null | string>('')
const pidControl = ref<number | null | string>('')
// const rightWaterUseRate = ref<number | null | string>('')
// const rightTemperature = ref<number | null | string>('')
// const rightidControl = ref<number | null | string>('')
const chartOrder3 = ref({
  TT_661: {},
  PIT_661: {},
  DNIT_661: {},
  PTCL_661: {},
  TOCIT_661: {},
  SiO2IT_661: {},
  DOIT_661: {},
  RIT_661: {},
}) // 图表展示顺序要和Loop3页面一直,Echart组件上的label和这部分一一对应
const chartOrder4 = ref({
  TT_662: {},
  PIT_662: {},
  DNIT_662: {},
  PTCL_662: {},
  TOCIT_662: {},
  SiO2IT_662: {},
  DOIT_662: {},
  RIT_662: {},
}) // 图表展示顺序要和Loop4页面一直

const timeValue = ref('')
const leftInputValues = ref({
  water_use_rate: '' as any,
  temperature: '' as any,
  pid_control: '' as any,
  pieValue: '' as any,
})
// const startTime = computed(() => {
//   const now = new Date()
//   const minutes = Math.round(now.getMinutes() / 10) * 10 // 最近的10分钟整数倍
//   const startHour =
//     (now.getHours() - Math.floor((now.getHours() + minutes / 60) / 12) * 12) %
//     24 // 向前推12小时，确保结果在0到23之间

//   return `${('0' + startHour).slice(-2)}:${('0' + minutes).slice(-2)}`
// })
// const realFilterData: realFilterDataType = ref({})
/**
 * #查询控制
 * 此处需要注意: chartData内变量名字和实际展示的名字存在不一样
 * 在Line组件内部和excel导出时，都将变量名重新格式化了一次
 */
const isSearchLoading = ref(false)

async function getModeType() {
  const { payload }: any = await getQueryModelConf()
  modeType.value = payload.mode
}
async function getFn() {
  try {
    isSearchLoading.value = true
    // 判断左边全部输入框是否输入，当没有输入值时，将左边输入框返回的值赋值给右边对应的值
    let isHasInputValue = false
    if (
      waterUseRate.value === '' &&
      temperature.value === '' &&
      pidControl.value === ''
    ) {
      isHasInputValue = false
    } else {
      isHasInputValue = true
    }
    const realPromise = getRealData()
    const aiPromise = getAIData()
    await Promise.all([realPromise, aiPromise])
    if (!isHasInputValue && rightControlVariable.value) {
      rightControlVariable.value.use_rate =
        leftInputValues.value.water_use_rate === ''
          ? '--'
          : leftInputValues.value.water_use_rate
      rightControlVariable.value.temperature =
        leftInputValues.value.temperature === ''
          ? '--'
          : leftInputValues.value.temperature
      rightControlVariable.value.pid_controller =
        leftInputValues.value.pid_control === ''
          ? '--'
          : leftInputValues.value.pid_control
      rightControlVariable.value.pieValue = leftInputValues.value.pieValue
    }
  } finally {
    isSearchLoading.value = false
  }
  // getRealData()
  // getAIData()
}
async function getRealData() {
  // 历史实际数据
  // const realFilterData = {}
  try {
    setRightLoading(true)
    const nowDate =
      dayjs(dateValue.value).format('YYYY-MM-DD') + ' ' + timeValue.value
    const { payload }: any = await getRealDataNew({
      aiLoop: modelValue.value,
      startTime: dayjs(nowDate)
        .subtract(12, 'hour')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(nowDate).add(12, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    })
    const data: any = payload
    // const data: any = mockRealData.payload
    // const payload = mockRealData.payload
    for (let key in data) {
      const prefix = key.split('_')[0] + '_' + key.split('_')[1]
      const afterfix = key.split('_')[2]
      if (['high', 'low', 'mean', 'act'].includes(afterfix)) {
        if (!realFilterData.value[prefix]) {
          realFilterData.value[prefix] = {}
        }
        realFilterData.value[prefix][key] = data[key]
      }
    }
    let array: any = []
    // 将图表顺序按照chartOrder排序
    let order: any = {}
    Object.keys(
      modelValue.value === 'LOOP3' ? chartOrder3.value : chartOrder4.value,
    ).forEach((key) => {
      order[key] = realFilterData.value[key]
    })
    realFilterData.value = order
    Object.keys(order).forEach((key) => {
      const high = key + '_high'
      const low = key + '_low'
      const mean = key + '_mean'
      const act = key + '_act'
      // 查找对应单位
      let unit = ''
      switch (key) {
        case 'DNIT_661':
          unit = 'ppb'
          break
        case 'DOIT_661':
          unit = 'ppb'
          break
        case 'PIT_661':
          unit = 'mpa'
          break
        case 'RIT_661':
          unit = 'MΩ.cm'
          break
        case 'TOCIT_661':
          unit = 'ppb'
          break
        case 'TT_661':
          unit = '℃'
          break
        case 'SiO2IT_661':
          unit = 'ppb'
          break
        case 'PTCL_661':
          unit = 'pcs/ml'
          break
      }
      //在实际值和下限之中找到最小值
      const minHigh: any = Math.min(...order[key][low])
      const minReal: any = Math.min(...order[key][act])
      const minData = Math.min(minHigh, minReal)
      //在实际值和上限之中找到最大值
      const maxHigh: any = Math.max(...order[key][high])
      const maxReal: any = Math.max(...order[key][act])
      const maxData = Math.max(maxHigh, maxReal)
      array.push({
        haveData: true,
        maxData: maxData,
        minData: minData,
        isChecked: false,
        time: payload.ts.map((m: any) =>
          dayjs(m).format('YYYY-MM-DD HH:mm:ss'),
        ),
        reality: order[key][act], //蓝色线 实际值
        range: order[key][high], // 上限
        min: order[key][low],
        preData: order[key][mean], // 红色线 预测值

        label: key,
        unit: unit,
      })
    })

    realChartDatas.value = array
    rightControlVariable.value = {
      use_rate: (payload['use_rate'] * 100).toFixed(2),
      temperature: payload['temperature'].toFixed(2),
      pid_controller: payload['pid_controller'].toFixed(3),
      tankRate: payload['tank'].toFixed(2),
      tankMpa: payload['tank_mpa'].toFixed(2),
      useValue: payload['use'].toFixed(2),
      FIQT_1:
        modelValue.value === 'LOOP3'
          ? payload['FIQT_671.OUT'].toFixed(2)
          : (payload['FIQT_672.OUT'] ?? 0).toFixed(2),
      FIQT_2:
        modelValue.value === 'LOOP3'
          ? payload['FIQT_661.OUT'].toFixed(2)
          : (payload['FIQT_662.OUT'] ?? 0).toFixed(2),
      pcvValue:
        modelValue.value === 'LOOP3'
          ? payload['PCV_671B.OUT_AO'].toFixed(2)
          : payload['PCV_672B.OUT_AO'].toFixed(2),
      pieValue: payload['use_rate'].toFixed(2),
    }
    const pieData =
      Number(
        (rightControlVariable.value?.FIQT_2 as any) -
          (rightControlVariable.value?.FIQT_1 as any),
      ) / (rightControlVariable.value?.FIQT_2 as any)
    rightControlVariable.value['pieValue'] =
      parseInt(rightControlVariable.value?.FIQT_2 as any) === 0
        ? 0
        : (Number(pieData) * 100).toFixed(2)
  } catch (error) {
    realChartDatas.value = [{}, {}, {}, {}, {}, {}, {}, {}]
  } finally {
    setRightLoading(false)
    // ElMessage({
    //   showClose: true,
    //   message: 'request error',
    //   type: 'error',
    // })
  }
}
async function getAIData() {
  //ai预测数据
  try {
    setLeftLoading(true)
    const nowDate =
      dayjs(dateValue.value).format('YYYY-MM-DD') + ' ' + timeValue.value
    const res = await getAIDataNew({
      page: 'AI_' + modelValue.value,
      mode_type: 'AI_' + modelValue.value + '_' + modeType.value,
      water_use_rate: waterUseRate.value,
      temperature: temperature.value,
      pid_control: pidControl.value,
      ts_start: dayjs(nowDate).format('YYYY-MM-DD HH:mm:ss'),
      ts_end: dayjs(nowDate).add(12, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    })
    const aiData: any = res.data
    // const aiData: any = mockAiData.data
    // const res = mockAiData
    const aiFilterData: any = {}
    for (let key in aiData) {
      const prefix = key.split('_')[0] + '_' + key.split('_')[1]
      const afterfix = key.split('_')[2]
      if (['high', 'low', 'mean', 'act'].includes(afterfix)) {
        if (!aiFilterData[prefix]) {
          aiFilterData[prefix] = {}
        }
        aiFilterData[prefix][key] = aiData[key]
      }
    }
    const array: any = []
    //orderWithRealFilterData为了让右侧的实际图表按右侧的实际数据顺序显示
    let orderWithRealFilterData: any = {}
    orderWithRealFilterData = Object.keys(realFilterData.value).reduce(
      (result: any, key) => {
        if (Object.prototype.hasOwnProperty.call(aiFilterData, key)) {
          result[key] = aiFilterData[key]
        }
        return result
      },
      {},
    )

    Object.keys(orderWithRealFilterData).forEach((key, index) => {
      const high = key + '_high'
      const low = key + '_low'
      const mean = key + '_mean'
      const act = key + '_act'
      // 查找对应单位
      let unit = ''
      switch (key) {
        case 'DNIT_661':
          unit = 'ppb'
          break
        case 'DOIT_661':
          unit = 'ppb'
          break
        case 'PIT_661':
          unit = 'mpa'
          break
        case 'RIT_661':
          unit = 'MΩ.cm'
          break
        case 'TOCIT_661':
          unit = 'ppb'
          break
        case 'TT_661':
          unit = '℃'
          break
        case 'SiO2IT_661':
          unit = 'ppb'
          break
        case 'PTCL_661':
          unit = 'pcs/ml'
          break
      }
      //因为左边的图表一半包含右侧图表的前72个值，所以需要判断最小值和最大值是在ai返回的72个值还是实际的72个值中
      const aiMin = Math.min(...orderWithRealFilterData[key][low])
      const realMin = Math.min(...realFilterData.value[key][act])
      const minData = Math.min(aiMin, realMin)
      const aiMax: any = Math.max(...orderWithRealFilterData[key][high])
      const realMax: any = Math.max(
        ...(realChartDatas.value[index]['reality'] as any),
      )
      const maxData = Math.max(aiMax, realMax)
      // const max: any = orderWithRealFilterData[key][high]
      // const maxData = Math.max(...max)
      array.push({
        haveData: true,
        maxData: maxData,
        minData: minData,
        isChecked: false,
        time: realChartDatas.value[index].time
          ?.slice(0, 72)
          .concat(
            res.data.ts.map((m: any) => dayjs(m).format('YYYY-MM-DD HH:mm:ss')),
          ),
        reality: realChartDatas.value[index]['reality'], //蓝色线 实际值
        range: Array.from({ length: 72 }, () => {
          '-'
        }).concat(orderWithRealFilterData[key][high]), // 上限
        min: Array.from({ length: 72 }, () => {
          '-'
        }).concat(orderWithRealFilterData[key][low]), //下限数组
        preData: Array.from({ length: 72 }, () => {
          '-'
        }).concat(orderWithRealFilterData[key][mean]), // 红色线 预测值
        label: key,
        unit: unit,
      })
    })
    aiChartDatas.value = array
    waterUseRate.value =
      res.data['water_use_rate'] === ''
        ? res.data['water_use_rate']
        : Number((Number(res.data['water_use_rate']) * 100).toFixed(2))
    temperature.value =
      res.data['temperature'] === ''
        ? res.data['temperature']
        : Number(Number(res.data['temperature']).toFixed(2))
    pidControl.value =
      res.data['pid_control'] === ''
        ? res.data['pid_control']
        : Number(Number(res.data['pid_control']).toFixed(3))
    leftInputValues.value = {
      water_use_rate: waterUseRate.value,
      temperature: temperature.value,
      pid_control: pidControl.value,
      pieValue: Number((Number(res.data['water_use_rate']) * 100).toFixed(2)),
    }
    leftControlVariable.value = {
      tankRate:
        modelValue.value === 'LOOP3'
          ? res.data['LIT_501A.AI'].toFixed(2)
          : (res.data['LIT_501B.AI'] ?? 0).toFixed(2),
      tankMpa:
        modelValue.value === 'LOOP3'
          ? res.data['PIT_501A.OUT'].toFixed(2)
          : (res.data['PIT_501B.OUT'] ?? 0).toFixed(2),
      useValue: res.data['use'].toFixed(2),
      FIQT_1:
        modelValue.value === 'LOOP3'
          ? res.data['FIQT_671.OUT'].toFixed(2)
          : (res.data['FIQT_672.OUT'] ?? 0).toFixed(2),
      FIQT_2:
        modelValue.value === 'LOOP3'
          ? res.data['FIQT_661.OUT'].toFixed(2)
          : (res.data['FIQT_662.OUT'] ?? 0).toFixed(2),
      pcvValue:
        modelValue.value === 'LOOP3'
          ? res.data['PCV_671B.OUT_AO'].toFixed(2)
          : (res.data['PCV_672B.OUT_AO'] ?? 0).toFixed(2),
      water_use_rate: Number(
        (Number(res.data['water_use_rate']) * 100).toFixed(2),
      ),
    }
    // const pieData =
    //   (Number(leftControlVariable.value?.FIQT_2 as any) -
    //     Number(leftControlVariable.value?.FIQT_1 as any)) /
    //   Number(leftControlVariable.value?.FIQT_2 as any)
    // leftControlVariable.value['water_use_rate'] =
    //   parseInt(leftControlVariable.value?.FIQT_2 as any) === 0
    //     ? 0
    //     : (Number(pieData) * 100).toFixed(2)
    // handleAIData()
  } catch (error: any) {
    ElMessage({
      showClose: true,
      message: error.message,
      type: 'error',
    })
    aiChartDatas.value = [{}, {}, {}, {}, {}, {}, {}, {}]
  } finally {
    setLeftLoading(false)
  }
}
//拼接左边图表数据，ai接口返回72个数据，前部分72个数据需要用real实际数据进行填充
// function handleAIData() {
//   for (let i = 0; i < aiChartDatas.value.length; i++) {
//     const _low: any = Array.from({ length: 72 }, () => {
//       '-'
//     })
//     aiChartDatas.value[i].min = _low.concat(aiChartDatas.value[i].min)
//     const _preData: any = Array.from({ length: 72 }, () => {
//       '-'
//     })
//     aiChartDatas.value[i].preData = _preData.concat(
//       aiChartDatas.value[i].preData,
//     )
//     const _rang: any = Array.from({ length: 72 }, () => {
//       '-'
//     })
//     aiChartDatas.value[i].range = _rang.concat(aiChartDatas.value[i].range)
//     const _time: any = realChartDatas.value[i].time?.slice(0, 72)
//     aiChartDatas.value[i].time = _time.concat(aiChartDatas.value[i].time)
//   }
//   console.log(aiChartDatas.value)
// }

/**
 * #时间控制
 */

const dateValue = ref<Date | string>(dayjs(new Date()).format('YYYY-MM-DD'))
// let dataSwapperValue: Date | '' = ''
// function disabledDateFun(time: any) {
//   return time.getTime() >= new Date().getTime()
// }
// function initialDateValue() {
//   // 获取当前时间
//   // const now = new Date(
//   //   dayjs(new Date().getTime() - 12 * 60 * 60 * 1000).format(
//   //     'YYYY-MM-DD HH:mm',
//   //   ) + ':00',
//   // )
//   const now = new Date(dayjs(new Date()).format('YYYY-MM-DD HH:mm') + ':00')
//   dateValue.value = now
//   dataSwapperValue = now
// }
// function dateChangeFn() {
//   if (dateValue.value && dateValue.value.getTime() > new Date().getTime()) {
//     dateValue.value = dataSwapperValue
//     ElMessage({
//       showClose: true,
//       message: 'Time cannot be in the future',
//       type: 'warning',
//     })
//   } else {
//     // dataSwapperValue = dateValue.value
//   }
// }
// initialDateValue()
// const endTime = computed(() => {
//   const now = new Date()
//   const minutes = Math.round(now.getMinutes() / 30) * 30 // 最近的30分钟整数倍
//   const endHour = now.getHours()
//   const endMinute = minutes

//   return `${('0' + endHour).slice(-2)}:${('0' + endMinute).slice(-2)}`
// })
const endTime = ref('')
const startTime = ref('')
function getEndTime() {
  const now = new Date()
  const minutes = Math.round(now.getMinutes() / 10) * 10 // 最近的10分钟整数倍
  const endHour = now.getHours()
  const endMinute = minutes

  endTime.value = `${('0' + endHour).slice(-2)}:${('0' + endMinute).slice(-2)}`
  return `${('0' + endHour).slice(-2)}:${('0' + endMinute).slice(-2)}`
}
function getStartTime() {
  const now = new Date()
  const minutes = Math.round(now.getMinutes() / 10) * 10 // 最近的10分钟整数倍
  // const startHour =
  //   (now.getHours() - Math.floor((now.getHours() + minutes / 60) / 12) * 12) %
  //   24 // 向前推12小时，确保结果在0到23之间

  // startTime.value = `${('0' + startHour).slice(-2)}:${('0' + minutes).slice(
  //   -2,
  // )}`
  now.setHours(now.getHours() - 12)
  // 确保小时数为24小时制
  if (now.getHours() < 0) {
    now.setDate(now.getDate() - 1) // 如果时间减去12小时后小于0，则减去一天
    now.setHours(now.getHours() + 24) // 然后将小时数调整为24小时制内的
  }
  let hours = now.getHours().toString().padStart(2, '0')
  // startTime.value = `${hours}:${minutes}`
  if (Number(hours) > 12) {
    startTime.value = '00:00'
  } else {
    startTime.value = `${hours}:${minutes}`
  }
  return startTime.value
  // `return `${('0' + startHour).slice(-2)}:${('0' + minutes).slice(-2)}`
}
function changeDay(val: any) {
  const curr = dayjs(new Date()).format('YYYY-MM-DD')
  const changeDay = dayjs(val).format('YYYY-MM-DD')
  if (changeDay !== curr) {
    startTime.value = '00:00'
    endTime.value = '23:50'
  } else {
    startTime.value = getStartTime()
    endTime.value = getEndTime()
  }
}

/**
 * #导出
 */
function exportFn() {
  const allChartsData = aiChartDatas.value.concat(realChartDatas.value)
  const excelData: any = []
  for (let i = 0; i < allChartsData.length; i++) {
    const itemChart = allChartsData[i]
    const excelItem: any = []
    for (let key in itemChart) {
      if (key === 'haveData') continue
      // if (key === 'label') {
      //   excelItem.label = itemChart.label
      // }
      if (key === 'time') {
        itemChart.time?.forEach((item) => {
          excelItem.push({
            time: item,
          })
        })
      }
      if (key === 'reality') {
        itemChart.reality?.forEach((item, index) => {
          excelItem[index].AIPoint = itemChart.label
          excelItem[index].reality = item
        })
      }
      if (key === 'preData') {
        itemChart.preData?.forEach((item, index) => {
          excelItem[index].preData = item
        })
      }
      if (key === 'min') {
        itemChart.min?.forEach((item: any, index) => {
          if (itemChart?.min !== undefined) excelItem[index].min = item
        })
      }
      // if (key === 'lowRange') {
      //   itemChart.lowRange?.forEach((item: any, index: number) => {
      //     excelItem[index].min = item
      //   })
      // }
      if (key === 'range') {
        itemChart.range?.forEach((item, index) => {
          if (itemChart?.maxData !== undefined) excelItem[index].max = item
        })
      }
      // if (key === 'preRateData') {
      //   itemChart.preRateData?.forEach((item: any, index: number) => {
      //     if (itemChart?.preRateData !== undefined)
      //       excelItem[index].preRateData = itemChart?.preRateData[index] + item
      //   })
      // }
    }
    excelData.push(excelItem)
  }
  exportAIData('AIModel', modelValue.value, excelData.flat(2))
}
// 获取当前时间最接近的整数时间
function getNowTime() {
  const now = new Date()
  const minutes = Math.round(now.getMinutes() / 10) * 10 // 最近的10分钟整数倍
  const hour = ('0' + now.getHours()).slice(-2)
  const formattedTime = `${hour}:${('0' + minutes).slice(-2)}`

  timeValue.value = formattedTime
}

onMounted(() => {
  getNowTime()
  getStartTime()
  getEndTime()
  getModeType()
  // let start = startTime.value
  // let end = endTime.value
  // if (Number(startTime.value.split(':')[0]) > 12) {
  //   startTime.value = end
  //   endTime.value = start
  // }
})

/**
 * #echarts数据
 */
</script>
<style lang="scss" scoped>
.el-checkbox.el-checkbox--large {
  height: auto;
}
.my-select.el-select {
  width: 120px;
}
.my-select :deep(.el-select__wrapper) {
  background-color: transparent !important;
  color: #fff;
}

:deep(.el-select__placeholder) {
  color: #fff !important;
}
.time-select :deep(.el-select__wrapper) {
  background-color: transparent !important;
  color: #fff !important;
  border: 1px solid #fff;
}
.container_swapper {
  height: 14.3rem;
  width: 100%;
  display: flex;
  gap: 4px;
}
:deep(.el-loading-mask) {
  background-color: rgb(27, 41, 59, 0.8) !important;
}
:deep(.el-scrollbar__view) {
  height: 100%;
}
// :deep(.el-input) {
//   width: 90px !important;
// }
</style>
