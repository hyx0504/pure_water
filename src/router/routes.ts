const routes = [
  {
    path: '/dashboards',
    name: 'dashboards',
    icon: 'icon-zhexian',
    component: () => import('@/layout/layout.vue'),
    redirect: '/dashboards/index',

    meta: {
      title: 'DASHBOARDS',
    },
    children: [
      {
        path: '/dashboards/loop3',
        name: 'loop3',
        component: () => import('@/views/loop3/index.vue'),
        meta: {
          title: 'LOOP3',
        },
      },
      {
        path: '/dashboards/loop4',
        name: 'loop4',
        component: () => import('@/views/loop4/index.vue'),
        meta: {
          title: 'LOOP4',
        },
      },
      {
        path: '/dashboards/ai',
        name: 'ai',
        component: () => import('@/views/ai/indexNew.vue'),
        meta: {
          title: 'AI',
        },
      },
      {
        path: '/dashboards/system',
        name: 'system',
        component: () => import('@/views/system/index.vue'),
        meta: {
          title: 'SYSTEM',
        },
      },
      {
        path: '/dashboards/history',
        name: 'history',
        component: () => import('@/views/history/index.vue'),
        meta: {
          title: 'HISTORY',
        },
      },
    ],
  },
  {
    path: '/HMI',
    name: 'HMI',
    icon: 'icon-shebei',
    meta: {
      title: 'HMI',
    },
    redirect: '/HMI/LOOP3/HEX',
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/HMI/LOOP3',
        name: 'HMILOOP3',
        meta: {
          title: 'LOOP3',
        },
        redirect: '/HMI/LOOP3/HEX',
        component: () => import('@/layout/layout.vue'),
        children: [
          {
            path: '/HMI/LOOP3/TANK',
            name: 'LOOP3TANK',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'TANK',
            },
          },
          {
            path: '/HMI/LOOP3/HEX',
            name: 'LOOP3HEX',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'HEX',
            },
          },
          {
            path: '/HMI/LOOP3/TOCUV',
            name: 'LOOP3TOCUV',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'TOCUV',
            },
          },
          {
            path: '/HMI/LOOP3/MDG2',
            name: 'LOOP3MDG2',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'MDG2',
            },
          },
          {
            path: '/HMI/LOOP3/POLISHER',
            name: 'LOOP3POLISHER',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'POLISHER',
            },
          },
          {
            path: '/HMI/LOOP3/UFUNIT',
            name: 'LOOP3UFUNIT',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'UFUNIT',
            },
          },
          {
            path: '/HMI/LOOP3/POU',
            name: 'LOOP3POU',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'POU',
            },
          },
        ],
      },
      {
        path: '/HMI/LOOP4',
        name: 'HMILOOP4',
        meta: {
          title: 'LOOP4',
        },
        redirect: '/HMI/LOOP4/HEX',
        component: () => import('@/layout/layout.vue'),
        children: [
          {
            path: '/HMI/LOOP4/TANK',
            name: 'LOOP4TANK',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'TANK',
            },
          },
          {
            path: '/HMI/LOOP4/HEX',
            name: 'LOOP4HEX',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'HEX',
            },
          },
          {
            path: '/HMI/LOOP4/TOCUV',
            name: 'LOOP4TOCUV',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'TOCUV',
            },
          },
          {
            path: '/HMI/LOOP4/MDG2',
            name: 'LOOP4MDG2',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'MDG2',
            },
          },
          {
            path: '/HMI/LOOP4/POLISHER',
            name: 'LOOP4POLISHER',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'POLISHER',
            },
          },
          {
            path: '/HMI/LOOP4/UFUNIT',
            name: 'LOOP4UFUNIT',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'UFUNIT',
            },
          },
          {
            path: '/HMI/LOOP4/POU',
            name: 'LOOP4POU',
            component: () => import('@/views/HMI/iframe.vue'),
            meta: {
              title: 'POU',
            },
          },
        ],
      },
      {
        path: '/HMI/POSTPREFILT',
        name: 'POSTPREFILT',
        component: () => import('@/views/HMI/iframe.vue'),
        meta: {
          title: 'POST PREFILT',
        },
      },
      {
        path: '/HMI/MDG1',
        name: 'MDG1',
        component: () => import('@/views/HMI/iframe.vue'),
        meta: {
          title: 'MDG1',
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'icon-setting',
    component: () => import('@/views/setting/index.vue'),
    meta: {
      title: 'SETTING',
    },
  },
]
export default routes
