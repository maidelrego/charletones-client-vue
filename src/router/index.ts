import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      meta: { requiresAuth: true },
      redirect: '/dashboard',
      component: () => import('@/shared/layouts/MainLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { requiresAuth: true },
          component: () => import('@/pages/DashboardPage.vue')
        },
        {
          path: '/create',
          name: 'create',
          meta: { requiresAuth: true },
          component: () => import('@/pages/CreatePage.vue')
        },
        {
          path: '/room',
          name: 'room',
          meta: { requiresAuth: true },
          component: () => import('@/pages/RoomPage.vue')
        },
        {
          path: '/settings',
          name: 'setings',
          meta: { requiresAuth: true },
          component: () => import('@/pages/SettingsPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/auth/components/LoginPage.vue')
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && !authStore.isLoggedIn) next({ name: 'login' })
  else next()
})
