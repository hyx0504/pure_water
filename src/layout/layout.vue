<!-- 路由模版文件 -->
<template>
  <router-view v-slot="{ Component }">
    <component :key="key" :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
const route = useRoute()
const key = computed(() => route.fullPath)
</script>

<style lang="scss" scoped></style>
