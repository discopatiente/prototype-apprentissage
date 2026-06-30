<template>
  <div class="level">
    <div class="level-header">
      <button class="btn-back" @click="router.push(`/matiere/${route.params.matiereId}`)">‹ Retour</button>
      <ScoreBadge />
    </div>

    <div v-if="niveau" class="level-content">
      <h1 class="level-title">{{ subject.titre }} · {{ niveau.titre }}</h1>
      <p class="level-subtitle">Touche une leçon pour commencer.</p>

      <div class="lessons-list">
        <button
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson-card"
          @click="router.push('/lesson/' + lesson.id)"
        >
          <div class="lesson-info">
            <div class="lesson-title-row">
              <span class="lesson-title">{{ lesson.titre }}</span>
              <span v-if="isNewLesson(lesson.id)" class="badge-new">Nouveau</span>
            </div>
            <span class="lesson-description">{{ lesson.description }}</span>
          </div>
          <div v-if="store.bestScoresByLesson[lesson.id] !== undefined" class="lesson-score">
            {{ store.bestScoresByLesson[lesson.id] }} / {{ lesson.maxScore }}
          </div>
          <span v-else class="lesson-arrow">→</span>
        </button>
      </div>
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

function isNewLesson(lessonId) {
  return niveau.value?.nouveau && !store.seenLessons.includes(lessonId)
}

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
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 24px 48px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-back {
  background: none;
  border: none;
  padding: 6px 4px;
  font-size: 16px;
  font-weight: 700;
  color: #C2855F;
  cursor: pointer;
}

.btn-back:hover { text-decoration: underline; }

.level-title {
  margin: 18px 2px 4px;
  font-size: 23px;
  font-weight: 800;
  color: #4A352B;
}

.level-subtitle {
  margin: 0 2px 18px;
  font-size: 15px;
  font-weight: 600;
  color: #A2937F;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  text-align: left;
  background: #FFFDFB;
  border: none;
  border-radius: 20px;
  padding: 18px;
  cursor: pointer;
  box-shadow: 0 10px 24px -16px rgba(74, 53, 43, 0.35);
  transition: transform 0.1s;
}

.lesson-card:active { transform: scale(0.985); }

.lesson-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lesson-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.lesson-title {
  font-size: 17px;
  font-weight: 800;
  color: #4A352B;
}

.badge-new {
  font-size: 10px;
  font-weight: 800;
  color: white;
  background: #C2855F;
  padding: 2px 7px;
  border-radius: 20px;
}

.lesson-description {
  font-size: 13px;
  font-weight: 600;
  color: #A2937F;
}

.lesson-score {
  font-size: 14px;
  font-weight: 800;
  color: #5E7A52;
  background: #E9F0E2;
  padding: 7px 12px;
  border-radius: 14px;
  white-space: nowrap;
}

.lesson-arrow {
  font-size: 22px;
  font-weight: 700;
  color: #D8C7B2;
  padding-right: 4px;
}

.level-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 64px 0;
  text-align: center;
  font-size: 16px;
  color: #A2937F;
}
</style>
