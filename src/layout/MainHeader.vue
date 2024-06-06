// 头部组件
<template>
  <div class="header-wrapper">
    <img src="@/assets/images/hearder-logo.png" class="hearder-logo" />
    <span class="title text-white">MXIC5 UPW2 DIGITAL SYSTEM</span>
    <div>
      <el-dropdown trigger="click">
        <div class="mr-5 flex items-center cursor-pointer">
          <el-avatar :size="24" :icon="UserFilled" />
          <span class="ml-2 user-name">
            {{ userInfo ? userInfo.name : '' }}
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { useUserInfo } from '@/stores/user'
import { clearInfo } from '@/utils/index'
const { userInfo } = storeToRefs(useUserInfo())
// 登出
const router = useRouter()
const logout = () => {
  ElMessageBox({
    title: '退出登录',
    message: '确定退出登录吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    clearInfo()
    router.push({ name: 'login' })
  })
}
</script>
<style scoped lang="scss">
@import '@/assets/css/_color.scss';
.header-wrapper {
  height: 100%;
  background-color: $bg-slider-color;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #ffffff;

  .hearder-logo {
    width: 34px;
    margin: 0 12px 0 18px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: auto;
  }
  .user-name {
    font-size: 14px;
    color: #fff;
  }
}
</style>
