import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/css/index.scss'
import '@/assets/icons/iconfont.css'
// uno样式
import 'uno.css'
import router from './router'

const app = createApp(App)

// 使用Pinia
app.use(createPinia())
// 使用router
app.use(router)
// 创建#app
app.mount('#app')
