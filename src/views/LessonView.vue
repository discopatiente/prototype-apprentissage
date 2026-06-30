<template>
  <div class="lesson">
    <div v-if="error" class="lesson-erreur">
      <p>Oups, cette leçon n'existe pas.</p>
      <button class="btn-suivant" @click="goToMenu">Retour au menu</button>
    </div>

    <div v-else-if="lesson">
      <header class="lesson-header">
        <h1 class="lesson-titre">{{ lesson.titre }}</h1>
        <ScoreBadge />
      </header>

      <div v-if="!finished" class="lesson-contenu">
        <p class="progression">Question {{ currentIndex + 1 }} / {{ lesson.exercices.length }}</p>

        <ExerciseQCM
          v-if="currentExercise.type === 'qcm'"
          :key="`qcm-${currentExercise.id}`"
          :exercise="currentExercise"
          @answer-submitted="onAnswerSubmitted"
        />
        <ExerciseQCMTexte
          v-else-if="currentExercise.type === 'qcm-texte'"
          :key="`texte-${currentExercise.id}`"
          :exercise="currentExercise"
          @answer-submitted="onAnswerSubmitted"
        />
        <ExerciseReponseCorte
          v-else-if="currentExercise.type === 'reponse-courte'"
          :key="`courte-${currentExercise.id}`"
          :exercise="currentExercise"
          @answer-submitted="onAnswerSubmitted"
        />

        <FeedbackMessage v-if="showFeedback" :correct="lastAnswerCorrect" />
        <button v-if="showFeedback" class="btn-suivant" @click="nextQuestion">
          {{ isLastQuestion ? 'Voir mon bilan' : 'Question suivante' }}
        </button>
      </div>

      <LessonBilan
        v-else
        :exercises="lesson.exercices"
        :id-lesson="lesson.id"
        @restart="restart"
        @go-to-level="goToLevel"
        @go-to-menu="goToMenu"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'
import ExerciseQCM from '../components/ExerciseQCM.vue'
import ExerciseQCMTexte from '../components/ExerciseQCMTexte.vue'
import ExerciseReponseCorte from '../components/ExerciseReponseCorte.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import LessonBilan from '../components/LessonBilan.vue'
import subjectsData from '../data/subjects.json'

const route = useRoute()
const router = useRouter()
const store = useProgressStore()

const lesson = ref(null)
const error = ref(false)
const currentIndex = ref(0)
const showFeedback = ref(false)
const lastAnswerCorrect = ref(false)
const finished = ref(false)

watchEffect(async () => {
  const id = route.params.id
  store.resetAttempt()
  currentIndex.value = 0
  showFeedback.value = false
  finished.value = false
  error.value = false
  try {
    const subject = id.split('-')[1]
    const module = await import(`../data/${subject}/${id}.json`)
    lesson.value = module.default
  } catch {
    error.value = true
  }
})

const currentExercise = computed(() => {
  return lesson.value.exercices[currentIndex.value]
})

const isLastQuestion = computed(() => {
  return currentIndex.value === lesson.value.exercices.length - 1
})

function onAnswerSubmitted({ id, isCorrect, points }) {
  store.submitAnswer(lesson.value.id, id, isCorrect, points)
  lastAnswerCorrect.value = isCorrect
  showFeedback.value = true
}

function nextQuestion() {
  if (isLastQuestion.value) {
    const maxScore = lesson.value.exercices.reduce((sum, ex) => sum + ex.points, 0)
    store.finishLesson(lesson.value.id, lesson.value.titre, maxScore)
    finished.value = true
  } else {
    currentIndex.value++
    showFeedback.value = false
  }
}

function restart() {
  store.resetAttempt()
  currentIndex.value = 0
  showFeedback.value = false
  finished.value = false
}

function goToLevel() {
  const lessonId = route.params.id
  for (const subject of subjectsData) {
    for (const niveau of subject.niveaux) {
      if (niveau.lessons.includes(lessonId)) {
        store.resetAttempt()
        router.push(`/matiere/${subject.id}/${niveau.id}`)
        return
      }
    }
  }
  router.push('/')
}

function goToMenu() {
  store.resetAttempt()
  router.push('/')
}
</script>

<style scoped>
.lesson {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-titre {
  font-size: 22px;
  font-weight: 500;
  margin: 0;
}

.progression {
  font-size: 14px;
  color: #757575;
  text-align: center;
  margin: 0;
}

.lesson-contenu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn-suivant {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  align-self: center;
}

.btn-suivant:hover {
  background: #1565c0;
}

.lesson-erreur {
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
