<!-- 侧边菜单 -->
<template>
  <div class="menu-wrapper relative h-full">
    <el-scrollbar class="menu-scrollbar" height="100%">
      <Time />
      <el-menu
        :defaultActive="Route.path.replace('/microApp', '')"
        :collapse-transition="false"
        text-color="#FFFFFF"
        @select="select"
        active-text-color="#1476CA"
        background-color="#3c3c3c"
        unique-opened
      >
        <mainMenuItem :menu-list="allRoutes"></mainMenuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import mainMenuItem from './MainMenuItem.vue'
import allMenuRoutes from '@/router/routes'
import Time from '../Time.vue'
const baseR = ref(allMenuRoutes)
const allRoutes = computed(() => {
  const routes = baseR.value
  return routes
})
// 3.ElMenu的默认菜单
const Route = useRoute()
const Router = useRouter()
const select = (path) => {
  const key = /^\//g.test(path) ? 'path' : 'name'
  Router.push({ [key]: path })
}
</script>
<style scoped>
.menu-wrapper {
  --el-menu-level-padding: 2rem;
  height: 100%;
  overflow: auto;
}
:deep(.el-menu) {
  height: 100%;
  overflow: hidden;
  border-right: 0;
}
</style>
<style lang="scss">
@import '@/assets/css/_color.scss';
.menu-wrapper {
  width: 235px;

  .menu-scrollbar {
    background-color: $bg-slider-color;
  }

  .el-sub-menu__title {
    height: 48px;
    line-height: 48px;
  }

  .el-sub-menu .el-menu-item {
    height: 48px;
    line-height: 48px;
  }

  .el-sub-menu .el-menu {
    background-color: rgba($menu-color, 0.1);
  }

  .el-sub-menu.is-active,
  .el-sub-menu:hover {
    .el-sub-menu__title {
      background: rgba($menu-color, 0.05) !important;
    }

    & > .el-sub-menu__title > .menu-icon {
      color: $menu-color;
    }
  }

  .el-menu-item::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 100%;
    border-radius: 0px 0px 0px 0px;

    position: absolute;
    left: 0;
    top: 0;
  }

  .el-menu-item.is-active,
  .el-menu-item:hover {
    background: rgba($menu-color, 0.65);
    color: white;

    &::before {
      background: rgba($menu-color, 0.95);
    }
  }

  .has_icon.mini-menu-title::before {
    display: none;
  }
}
</style>
