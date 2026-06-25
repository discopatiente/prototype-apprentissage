<template>
  <div class="level">
    <header class="level-header">
      <button class="btn-back" @click="router.push(`/matiere/${route.params.matiereId}`)">← Retour</button>
      <ScoreBadge />
    </header>

    <div v-if="niveau" class="level-content">
      <div class="level-intro">
        <h1 class="level-title">{{ subject.titre }} — {{ niveau.titre }}</h1>
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

      <p v-else class="no-lessons">Pas encore de leçons dans ce niveau.</p>
    </div>

    <div v-else class="level-error">
      <p>Ce niveau n'existe pas.</p>
      <button class="btn-back" @click="router.push('/')">Retour au menu</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'
import subjectsData from '../data/subjects.json'

const route = useRoute()
const router = useRouter()
const store = useProgressStore()

const lessons = ref([])

const subject = computed(() => subjectsData.find((s) => s.id === route.params.matiereId) ?? null)

const niveau = computed(() => {
  if (!subject.value) return null
  return subject.value.niveaux.find((n) => n.id === route.params.niveauId) ?? null
})

watchEffect(async () => {
  if (!niveau.value || niveau.value.lessons.length === 0) {
    lessons.value = []
    return
  }

  const loaded = await Promise.all(
    niveau.value.lessons.map((lessonId) => {
      const subjectId = lessonId.split('-')[1]
      return import(`../data/${subjectId}/${lessonId}.json`).then((m) => m.default)
    }),
  )

  lessons.value = loaded.map((lesson) => ({
    ...lesson,
    maxScore: lesson.exercices.reduce((sum, ex) => sum + ex.points, 0),
  }))
})
</script>

<style scoped>
.level {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.level-header {
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

.level-intro {
  text-align: center;
}

.level-title {
  font-size: 24px;
  font-weight: 500;
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

.level-error {
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
