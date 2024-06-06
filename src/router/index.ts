import { createRouter, createWebHistory } from 'vue-router'
import allMenuRoutes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useTokenStore } from '@/stores/user'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'main',
    redirect: '/dashboards/loop3',
    component: () => import('@/layout/index.vue'),
    children: [...allMenuRoutes],
  },
  {
    path: '/historyjump',
    name: 'historyjump',
    component: () => import('@/views/jump.vue'),
    meta: {
      title: 'historyjump',
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/:pathMatch(.*)',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/:pathMatch(.*)',
        name: '404',
        meta: {
          title: '无页面',
        },
        component: () => import('@/views/404.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach(async (to: any) => {
  const { token } = storeToRefs(useTokenStore())
  const localStorageToken = token.value
  NProgress.start()
  if (['login'].includes(to.name)) {
    // 如果有token进入首页
    if (localStorageToken) {
      return {
        name: 'overview',
      }
    }
    return true
  }
  // 没有Token将路由数据携带至login页面
  if (!localStorageToken) {
    if (['404'].includes(to.name)) {
      return true
    } else {
      ElMessage({
        showClose: true,
        message: '用户未登录',
        type: 'error',
      })
      return {
        name: 'login',
        query: { fullPath: to?.path ?? to?.fullPath, ...to.query },
        params: to.params,
      }
    }
  } else {
    /**
     * @Description 嵌套跳转(废弃)
     */
    if (['historyjump'].includes(to.name)) {
      if (window.top === window.self) {
        return { path: '/dashboards/history' }
      } else if (window.top) {
        window.top.location.href = 'http://localhost:8090/dashboards/history'
      }
    }
    return true
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
