import type { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main.home',
    component: () => import('@render/@modules/Home.vue'),
  },
  {
    path: '/about',
    name: 'main.about',
    component: () => import('@render/@modules/About.vue'),
  },

]

export default mainRoutes
