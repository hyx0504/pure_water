import { defineConfig, loadEnv } from 'vite'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// 引入Unocss
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
/** 路径查找 */
const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}
export default defineConfig(({ mode }): any => {
  const viteEnv = loadEnv(mode, './')
  return {
    plugins: [
      vue(),
      // 使用Unocss
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      // 按需自动导入API
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core', 'pinia'],
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        },
      }),
      // 按需自动导入组件
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: 'src/components.d.ts',
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    css: {
      postcss: {
        plugins: [
          // 自动加浏览器前缀
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true,
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/element-theme.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: '8090',
      open: true,
      // 端口占用直接退出
      strictPort: true,
      // 本地服务 CORS 是否开启
      cors: true,
      // proxy: {
      //   [viteEnv.VITE_BASE_URL]: {
      //     target: viteEnv.VITE_BASE_SERVER_URL,
      //     // 允许跨域
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(viteEnv.VITE_BASE_URL, '/'),
      //   },
      // },
      proxy: {
        [viteEnv.VITE_BASE_URL || 'hyx']: {
          target: viteEnv.VITE_SERVER,
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            [`^${viteEnv.VITE_BASE_URL || 'hyx'}`]: ``,
          },
        },
        // '/scada': {
        //   target: 'http://192.168.222.129:8001',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/scada': '',
        //   },
        // },
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static/assets',
      // minify: 'terser',
      // sourcemap: true,
      // 规定触发警告的 chunk 大小，消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      //生产环境下清空console.log
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
      },
    },
  }
})
