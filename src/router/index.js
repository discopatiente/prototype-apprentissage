import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThemeView from '../views/ThemeView.vue'
import LessonView from '../views/LessonView.vue'
import ProgressView from '../views/ProgressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/theme/:id',
      name: 'theme',
      component: ThemeView,
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
  ],
})

export default router
