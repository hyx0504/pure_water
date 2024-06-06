<template>
  <div class="relative route-page">
    <img :src="tips.img" class="absolute" :class="tips.class" alt="" />
    <div
      class="absolute flex flex-row flex-wrap justify-center content-between w-50 h-20 tip"
    >
      <span class="w-full font">{{ tips.tip }}</span>
      <el-button type="primary" @click="jump">back</el-button>
    </div>
  </div>
</template>

<script setup>
import Img404 from '@/assets/images/404.png'
const router = useRouter()

const jump = () => {
  router.replace('/')
}
const tips = {
  img: Img404,
  tip: 'The page you visited does not exist!',
  class: 'position-404',
}
</script>
<style lang="scss" scoped>
.route-page.ptb-0 {
  background: rgb(65, 87, 118);
}

.position-404 {
  height: 70%;
  width: 50%;
  top: 10%;
  left: 25%;
}

.tip {
  top: 70%;
  left: 45%;
}

.font {
  color: white;
  font-size: 1.3rem;
}
</style>
