import { getColorOptions } from '@/request/loop'

export default () => {
  const colorBarsCSS: Record<string, any> = {
    DNIT: {
      red0: 1,
      yellow0: 1,
      white: 7,
      yellow1: 1,
      red1: 1,
    },
    PTIL: {
      red0: 0,
      yellow0: 0,
      white: 9,
      yellow1: 1,
      red1: 1,
    },
    RIT: {
      red0: 1,
      yellow0: 1,
      white: 9,
      yellow1: 0,
      red1: 0,
    },
    TOCT: {
      red0: 0,
      yellow0: 0,
      white: 9,
      yellow1: 1,
      red1: 1,
    },
    SIO2T: {
      red0: 0,
      yellow0: 0,
      white: 9,
      yellow1: 1,
      red1: 1,
    },
    DOIT: {
      red0: 0,
      yellow0: 0,
      white: 9,
      yellow1: 1,
      red1: 1,
    },
  }
  watchEffect(async () => {
    const data: any = {
      DNIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
      PTIL: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
      RIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
      TOCT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
      SIO2T: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
      DOIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    }
    const { code, payload } = (await getColorOptions()) as any
    if (code === 200) {
      // DNIT
      data.DNIT.red0 = payload.dnit_red_bottom
      data.DNIT.red1 = payload.dnit_red_min
      data.DNIT.yellow2 = payload.dnit_yellow_min
      data.DNIT.white3 = payload.dnit_white
      data.DNIT.yellow4 = payload.dnit_yellow_max
      data.DNIT.red5 = payload.dnit_red_max
      // PTIL
      data.PTIL.white3 = payload.ptil_white
      data.PTIL.yellow4 = payload.ptil_yellow_max
      data.PTIL.red5 = payload.ptil_red_max
      // RIT
      data.RIT.white3 = payload.rit_white
      data.RIT.yellow2 = payload.rit_yellow_min
      data.RIT.red1 = payload.rit_red_min
      // TOCT
      data.TOCT.white3 = payload.toct_white
      data.TOCT.yellow4 = payload.toct_yellow_max
      data.TOCT.red5 = payload.toct_red_max
      // SIO2T
      data.SIO2T.white3 = payload.sio2_white
      data.SIO2T.yellow4 = payload.sio2_yellow_max
      data.SIO2T.red5 = payload.sio2_red_max
      // DOIT
      data.DOIT.white3 = payload.doit_white
      data.DOIT.yellow4 = payload.doit_yellow_max
      data.DOIT.red5 = payload.doit_red_max
    }
    colorBarsNumber.value = data
  })
  const colorBarsNumber = ref<Record<string, any>>({
    DNIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    PTIL: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    RIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    TOCT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    SIO2T: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
    DOIT: { red0: 0, red1: 0, yellow2: 0, white3: 0, yellow4: 0, red5: 0 },
  })
  const colorDataNumbers = ref<Record<string, any>>({
    DNIT: 15.14,
    PTIL: 0,
    RIT: 18.25,
    TOCT: 0.33,
    SIO2T: 0.12,
    DOIT: 0.42,
  })
  return {
    colorBarsCSS, // css色条长度
    colorBarsNumber, // 色条门限范围==>setting配置
    /**
     * 指针不能越界，所以
     * 白黄红类型，最小只能停在白
     * 红黄白类型最大只能停在白
     */
    colorDataNumbers, // 指针
  }
}
