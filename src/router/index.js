import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      name: 'registre',
      component: () => import('../views/register.vue')
    },
    {
      path: '/tasks',
      name: 'tasques',
      component: () => import('../views/tasks.vue'),
    },
    {
      path: '/task/:id',
      name: 'tasca',
      component: () => import('../views/taskDetail.vue'),
      props: true
    }
  ],
})

export default router
