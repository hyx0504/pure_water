<template>
  <el-container class="h-full">
    <el-header><MainHeader /></el-header>
    <el-container class="overflow-auto">
      <el-aside>
        <MainMenu />
      </el-aside>
      <el-main class="flex flex-col reactive">
        <div class="flex-1 bg-[#05080e] overflow-hidden main-wrapper">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MainHeader from '@/layout/MainHeader.vue'
import MainMenu from '@/layout/mainMenu/MainMenu.vue'
</script>
<style scoped>
:deep(.el-container) {
  background: rgb(237, 239, 243);
}

:deep(.el-header) {
  padding: 0;
  height: 56px;
}

:deep(.el-aside) {
  width: auto;
}

:deep(.el-main) {
  padding: 0;
  display: flex;
}
</style>
