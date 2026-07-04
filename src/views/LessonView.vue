<template>
  <div class="lesson">
    <div v-if="error" class="lesson-error">
      <p>Oups, cette leçon n'existe pas.</p>
      <button class="btn-primary" @click="goToMenu">Retour au menu</button>
    </div>

    <template v-else-if="lesson">
      <div class="lesson-topbar">
        <button class="btn-back" @click="goToLevel">‹</button>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPct }"></div>
        </div>
        <span class="progress-label">{{ currentIndex + 1 }} / {{ totalSteps }}</span>
      </div>

      <div v-if="!finished" class="lesson-content">
        <span class="lesson-label" :style="{ color: subjectColor }">{{ lesson.titre }}</span>

        <template v-if="isDiaporama">
          <EcranDiaporama :key="currentEcran.id" :ecran="currentEcran" />

          <div class="diaporama-nav">
            <button v-if="currentIndex > 0" class="btn-secondary" @click="prevEcran">
              ‹ Précédent
            </button>
            <button v-if="!isLastEcran" class="btn-primary" @click="nextEcran">
              Suivant
            </button>
            <button v-else class="btn-primary" @click="terminerDiaporama">
              Terminer la leçon
            </button>
          </div>
        </template>

        <template v-else>
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

          <div v-if="showFeedback" class="feedback-zone">
            <FeedbackMessage :correct="lastAnswerCorrect" />
            <button class="btn-primary" @click="nextQuestion">
              {{ isLastQuestion ? 'Voir mon bilan' : 'Question suivante' }}
            </button>
          </div>
        </template>
      </div>

      <LessonBilan
        v-else
        :exercises="bilanExercises"
        :id-lesson="lesson.id"
        @restart="restart"
        @go-to-level="goToLevel"
        @go-to-menu="goToMenu"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ExerciseQCM from '../components/ExerciseQCM.vue'
import ExerciseQCMTexte from '../components/ExerciseQCMTexte.vue'
import ExerciseReponseCorte from '../components/ExerciseReponseCorte.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import LessonBilan from '../components/LessonBilan.vue'
import EcranDiaporama from '../components/EcranDiaporama.vue'
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
    store.markLessonSeen(id)
  } catch {
    error.value = true
  }
})

const isDiaporama = computed(() => lesson.value?.type === 'diaporama')

const currentExercise = computed(() => lesson.value.exercices[currentIndex.value])

const isLastQuestion = computed(
  () => currentIndex.value === lesson.value.exercices.length - 1,
)

const currentEcran = computed(() => lesson.value.ecrans[currentIndex.value])

const isLastEcran = computed(
  () => currentIndex.value === lesson.value.ecrans.length - 1,
)

const totalSteps = computed(() => {
  if (!lesson.value) return 0
  return isDiaporama.value ? lesson.value.ecrans.length : lesson.value.exercices.length
})

const progressPct = computed(() => {
  if (!lesson.value) return '0%'
  const total = totalSteps.value
  const done = isDiaporama.value
    ? currentIndex.value
    : currentIndex.value + (showFeedback.value ? 1 : 0)
  return Math.round((done / total) * 100) + '%'
})

const bilanExercises = computed(() => {
  if (!lesson.value) return []
  if (isDiaporama.value) {
    return [{ id: 'diaporama', question: lesson.value.titre, points: lesson.value.points }]
  }
  return lesson.value.exercices
})

const subjectColor = computed(() => {
  if (!lesson.value) return '#DD8A78'
  return subjectsData.find((s) => s.id === lesson.value.theme)?.color ?? '#DD8A78'
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

function prevEcran() {
  if (currentIndex.value > 0) currentIndex.value--
}

function nextEcran() {
  if (!isLastEcran.value) currentIndex.value++
}

function terminerDiaporama() {
  store.submitAnswer(lesson.value.id, 'diaporama', true, lesson.value.points)
  store.finishLesson(lesson.value.id, lesson.value.titre, lesson.value.points)
  finished.value = true
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
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 24px 32px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.lesson-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-back {
  background: none;
  border: none;
  padding: 4px 6px;
  font-size: 22px;
  font-weight: 700;
  color: #C2855F;
  cursor: pointer;
  line-height: 1;
}

.progress-bar {
  flex: 1;
  height: 9px;
  background: #EFE3D2;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #EFA88C;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 14px;
  font-weight: 700;
  color: #A2937F;
  white-space: nowrap;
}

.lesson-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 22px;
  flex: 1;
}

.lesson-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feedback-zone {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
}

.btn-primary {
  width: 100%;
  height: 62px;
  border: none;
  border-radius: 30px;
  background: #EFA88C;
  color: #4A352B;
  font-size: 19px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 22px -12px rgba(216, 138, 108, 0.7);
}

.btn-primary:active { transform: scale(0.98); }

.diaporama-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
}

.btn-secondary {
  width: 100%;
  height: 50px;
  border: 2px solid #E8B79F;
  border-radius: 25px;
  background: #FFFDFB;
  color: #C2855F;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.btn-secondary:active { transform: scale(0.98); }

.lesson-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 64px 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #A2937F;
}
</style>
