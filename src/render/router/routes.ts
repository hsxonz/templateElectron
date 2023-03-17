import type { RouteRecordRaw } from 'vue-router'
import mainRoutes from './main'

const routes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    component: () => import('@render/layouts/LayoutMain.vue'),
    children: [...mainRoutes],
  },
]

export default routes
