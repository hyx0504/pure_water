/**
 * #校验色条范围
 * 1. 分组
 * 2. 数字类型校验
 * 3. 加入数组
 * 4. 排序
 * 5. 与原来数组对比是否一致
 *
 * return BOOLEAN
 */
export default (numberArr: any) => {
  const data: any = {
    dnit: [0, 0, 0, 0, 0, 0],
    ptil: [0, 0, 0, 0, 0, 0],
    toct: [0, 0, 0, 0, 0, 0],
    sio2: [0, 0, 0, 0, 0, 0],
    doit: [0, 0, 0, 0, 0, 0],
    rit: [0, 0, 0, 0, 18.5, 18.5],
  }
  const postion: any = {
    red_bottom: 0,
    red_min: 1,
    yellow_min: 2,
    white: 3,
    yellow_max: 4,
    red_max: 5,
  }

  // 1. 分组
  for (const key in numberArr) {
    const barObj = key.split('_')[0]
    const x = key.split('_').slice(1).join('_')
    console.log(barObj, '---', x)
    // 2. 数字类型校验
    if (isNaN(numberArr[key])) {
      ElMessage({
        showClose: true,
        message: `${barObj} input error!`,
        type: 'warning',
      })
      return false
    }
    // 3. 加入数组
    else {
      data[barObj][postion[x]] = numberArr[key]
    }
  }
  console.log('数组填充完毕', data)
  // 4. 校验排序
  for (const key in data) {
    const arrSwapper = data[key].slice().sort(function (a: number, b: number) {
      return a - b
    })
    if (
      arrSwapper[0] !== data[key][0] ||
      arrSwapper[1] !== data[key][1] ||
      arrSwapper[2] !== data[key][2] ||
      arrSwapper[3] !== data[key][3] ||
      arrSwapper[4] !== data[key][4] ||
      arrSwapper[5] !== data[key][5]
    ) {
      ElMessage({
        showClose: true,
        message: `${key.split('-')[0]} sequence error!`,
        type: 'warning',
      })
      return false
    }
  }
  return true
}
