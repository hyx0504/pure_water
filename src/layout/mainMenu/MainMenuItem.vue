<template>
  <template v-for="item in menuList" :key="item.name">
    <!-- 如果当前菜单有下级,循环下级 -->
    <template v-if="item.display !== 0">
      <el-sub-menu
        v-if="item[keyObj.children] && item[keyObj.children]?.length > 0"
        :index="item?.path || item?.id"
      >
        <template #title>
          <i class="text-base menu-icon mr-2" :class="item.icon"></i>
          <span class="truncate menu-title">
            {{ item?.meta?.title }}
          </span>
        </template>

        <!-- 递归调用自身 -->
        <main-menu-item
          :menuList="item[keyObj.children]"
          :index="item?.path || item?.name"
        ></main-menu-item>
      </el-sub-menu>

      <!-- 没有下级 -->
      <el-menu-item v-else :index="item?.path">
        <i class="text-base menu-icon mr-2" :class="item.icon"></i>
        <span class="truncate menu-title" :class="{ has_icon: item.icon }">
          {{ item?.meta?.title }}
        </span>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
defineProps({
  index: [String, Number],
  menuList: {
    type: Array,
    default: () => [],
  },
})
const keyObj = computed(() => {
  return {
    children: 'children',
  }
})
</script>
<style scoped scss>
.menu-title {
  font-size: 1.2rem;
  font-weight: 1000;
}
</style>
