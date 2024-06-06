<template>
  <div class="route-page pt-4 flex flex-col items-center justify-center">
    <div class="card-container flex flex-col">
      <div class="title">DASHBOARD</div>
      <div class="w-full flex-1 flex items-center justify-center gap-6">
        <div
          @click="jump(item.path)"
          class="card cursor-pointer"
          :key="index"
          v-for="(item, index) in cardsDashBoards"
        >
          <div class="mb-4">{{ item.name1 }}</div>
          <div>{{ item.name2 }}</div>
        </div>
      </div>
    </div>
    <div class="card-container flex flex-col">
      <div class="title">SCADA(HMI)</div>
      <div class="w-full flex-1 flex items-center justify-center gap-6">
        <div
          @click="jump(item.path)"
          class="card cursor-pointer"
          :key="index"
          v-for="(item, index) in cardsDashHMI"
        >
          <div>{{ item.name1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const cardsDashBoards = [
  { name1: 'LOOP3', name2: 'DASHBOARDS', path: '/dashboards/loop3' },
  { name1: 'LOOP4', name2: 'DASHBOARDS', path: '/dashboards/loop4' },
  { name1: 'AI MODELING', name2: 'DASHBOARDS', path: '/dashboards/ai' },
  { name1: 'SYSTEM', name2: 'DASHBOARDS', path: '/dashboards/system' },
]
const cardsDashHMI = [
  { name1: 'PREFILTER', path: '/dashboards/loop3' },
  { name1: 'MDG1', path: '/dashboards/loop4' },
  { name1: 'LOOP3', path: '/dashboards/ai' },
  { name1: 'LOOP4', path: '/dashboards/system' },
]
const Router = useRouter()
const jump: { (path: string): void } = (path) => {
  Router.push(path)
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
.card-container {
  width: calc((100% - 4rem));
  height: calc((100% - 4rem) / 2);
  background: $bg-container-color;
  & + .card-container {
    margin-top: 2rem;
  }
}
.title {
  height: 42px;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(20, 130, 223, 0.9) 0%,
    rgba(20, 130, 223, 0) 100%
  );
}
.card {
  width: 22.5%;
  height: 80%;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #2b5783;
  font-size: 2rem;
  overflow: hidden;
}
</style>
