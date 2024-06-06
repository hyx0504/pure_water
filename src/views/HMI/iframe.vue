<template>
  <div class="route-page relative">
    <div v-if="onLoad">loading...</div>
    <iframe
      :src="src"
      id="myIframe"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="auto"
      style="position: absolute; top: 0px; left: 0px"
    ></iframe>
  </div>
</template>
<script setup lang="ts">
import { initHmiPage, getPublicSetting } from '@/request/system'

const src = ref('')
const onLoad = ref(true)
// 进入页面后使用路由name去HMI文件查询出对应src
const name = useRoute().name as string
const init = ['LOOP3POU', 'LOOP4POU']
onMounted(async () => {
  const { data: PublicData } = await getPublicSetting()
  if (name) src.value = PublicData[name]
  const _iframe: HTMLIFrameElement | null = document.querySelector('#myIframe')
  if (_iframe) {
    _iframe.onload = function () {
      // _iframe加载完毕以后执行操作
      if (init.includes(name)) {
        setTimeout(initHmiPage, 1000)
      }
      onLoad.value = false
    }
  }
})
</script>
<style lang="scss" scoped>
.card-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
@/router/useHMI
