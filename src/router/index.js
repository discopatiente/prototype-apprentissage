import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubjectView from '../views/SubjectView.vue'
import LevelView from '../views/LevelView.vue'
import LessonView from '../views/LessonView.vue'
import ProgressView from '../views/ProgressView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminView from '../views/AdminView.vue'
import { useAuthStore } from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/matiere/:matiereId',
      name: 'subject',
      component: SubjectView,
    },
    {
      path: '/matiere/:matiereId/:niveauId',
      name: 'level',
      component: LevelView,
    },
    {
      path: '/lesson/:id',
      name: 'lesson',
      component: LessonView,
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth && to.name !== 'admin-login') return

  const authStore = useAuthStore()
  await authStore.readyPromise

  if (to.meta.requiresAuth && !authStore.user) {
    return { name: 'admin-login' }
  }
  if (to.name === 'admin-login' && authStore.user) {
    return { name: 'admin' }
  }
})

export default router
