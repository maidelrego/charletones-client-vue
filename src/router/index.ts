import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateView.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('@/views/RoomView.vue')
    },
    {
      path: '/settings',
      name: 'setings',
      component: () => import('@/views/SettingsView.vue')
    }
  ]
})

export default router
