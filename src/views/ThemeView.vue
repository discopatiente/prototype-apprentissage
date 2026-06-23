<template>
  <div class="theme">
    <header class="theme-header">
      <button class="btn-back" @click="router.push('/')">← Retour</button>
      <ScoreBadge />
    </header>

    <div v-if="theme" class="theme-content">
      <div class="theme-intro">
        <p class="theme-icon">{{ theme.icone }}</p>
        <h1 class="theme-title">{{ theme.titre }}</h1>
        <p class="theme-description">{{ theme.description }}</p>
      </div>

      <div v-if="lessons.length > 0" class="lessons-list">
        <button
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson-card"
          @click="router.push('/lesson/' + lesson.id)"
        >
          <div class="lesson-info">
            <span class="lesson-title">{{ lesson.titre }}</span>
            <span class="lesson-description">{{ lesson.description }}</span>
          </div>
          <div v-if="store.bestScoresByLesson[lesson.id] !== undefined" class="lesson-score">
            <span class="lesson-score-value">{{ store.bestScoresByLesson[lesson.id] }}</span>
            <span class="lesson-score-max">/ {{ lesson.maxScore }} pts</span>
          </div>
          <span v-else class="lesson-arrow">→</span>
        </button>
      </div>

      <p v-else class="no-lessons">Pas encore de leçons dans ce thème.</p>
    </div>

    <div v-else class="theme-error">
      <p>Ce thème n'existe pas.</p>
      <button class="btn-back" @click="router.push('/')">Retour au menu</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'
import themesData from '../data/themes.json'

const route = useRoute()
const router = useRouter()
const store = useProgressStore()

const theme = ref(null)
const lessons = ref([])

watchEffect(async () => {
  const id = route.params.id
  const found = themesData.find((t) => t.id === id)

  if (!found) {
    theme.value = null
    lessons.value = []
    return
  }

  theme.value = found

  const loaded = await Promise.all(
    found.lessons.map((lessonId) => import(`../data/${lessonId}.json`).then((m) => m.default)),
  )

  lessons.value = loaded.map((lesson) => ({
    ...lesson,
    maxScore: lesson.exercices.reduce((sum, ex) => sum + ex.points, 0),
  }))
})
</script>

<style scoped>
.theme {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-back {
  font-size: 15px;
  color: #1976d2;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-back:hover {
  text-decoration: underline;
}

.theme-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.theme-icon {
  font-size: 64px;
  margin: 0;
  line-height: 1;
}

.theme-title {
  font-size: 28px;
  font-weight: 500;
  margin: 0;
}

.theme-description {
  font-size: 16px;
  color: #757575;
  margin: 0;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.2s;
}

.lesson-card:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.lesson-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.lesson-description {
  font-size: 13px;
  color: #757575;
}

.lesson-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;
}

.lesson-score-value {
  font-size: 20px;
  font-weight: 700;
  color: #2e7d32;
}

.lesson-score-max {
  font-size: 12px;
  color: #757575;
}

.lesson-arrow {
  font-size: 20px;
  color: #bdbdbd;
}

.no-lessons {
  text-align: center;
  color: #9e9e9e;
  font-size: 16px;
}

.theme-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 64px 16px;
  text-align: center;
  font-size: 18px;
  color: #757575;
}
</style>
