import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'apprentissage-progress'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const useProgressStore = defineStore('progress', () => {
  const savedData = loadFromStorage()

  const scoreGlobal = ref(savedData?.scoreGlobal ?? 0)
  const balloons = ref(savedData?.balloons ?? 0)
  const bestScoresByLesson = ref(savedData?.bestScoresByLesson ?? {})
  const attemptHistory = ref(savedData?.attemptHistory ?? [])
  const currentAttemptScores = ref({})
  const completedExercisesInAttempt = ref([])
  const lastSessionBalloons = ref(0)

  watch(
    [scoreGlobal, balloons, bestScoresByLesson, attemptHistory],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          scoreGlobal: scoreGlobal.value,
          balloons: balloons.value,
          bestScoresByLesson: bestScoresByLesson.value,
          attemptHistory: attemptHistory.value,
        }),
      )
    },
    { deep: true },
  )

  const currentAttemptScore = computed(() => {
    return Object.values(currentAttemptScores.value).reduce((a, b) => a + b, 0)
  })

  // Une leçon est terminée dès qu'elle a été menée jusqu'au bilan au moins une fois.
  // On se base sur l'historique et les meilleurs scores, déjà sauvegardés :
  // les leçons faites avant cette fonctionnalité sont donc reconnues aussi.
  function isLessonCompleted(lessonId) {
    return (
      bestScoresByLesson.value[lessonId] !== undefined ||
      attemptHistory.value.some((attempt) => attempt.lessonId === lessonId)
    )
  }

  // Retourne true si toutes les leçons de la liste sont terminées
  function areAllLessonsCompleted(lessonIds) {
    return lessonIds.length > 0 && lessonIds.every((id) => isLessonCompleted(id))
  }

  function submitAnswer(lessonId, exerciseId, isCorrect, points) {
    const key = `${lessonId}/${exerciseId}`
    if (isCorrect && !completedExercisesInAttempt.value.includes(key)) {
      currentAttemptScores.value[key] = points
      completedExercisesInAttempt.value.push(key)
    } else if (!isCorrect) {
      currentAttemptScores.value[key] = 0
    }
  }

  function finishLesson(lessonId, lessonTitle, maxScore) {
    const attemptScore = currentAttemptScore.value
    const previousBest = bestScoresByLesson.value[lessonId] || 0

    if (attemptScore > previousBest) {
      const improvement = attemptScore - previousBest
      scoreGlobal.value += improvement
      bestScoresByLesson.value[lessonId] = attemptScore
    }

    // Ballon uniquement lors du premier 100% sur cette leçon
    lastSessionBalloons.value = 0
    if (attemptScore === maxScore && previousBest < maxScore) {
      balloons.value += 1
      lastSessionBalloons.value = 1
    }

    attemptHistory.value.push({
      date: new Date().toISOString(),
      lessonId,
      lessonTitle: lessonTitle ?? lessonId,
      score: attemptScore,
      maxScore: maxScore ?? 0,
    })

    sendResultsToAdmin(lessonTitle ?? lessonId, attemptScore, maxScore ?? 0)
  }

  function sendResultsToAdmin(lessonTitle, score, maxScore) {
    const body = new URLSearchParams({
      'form-name': 'resultats-lecon',
      lecon: lessonTitle,
      score: String(score),
      'score-max': String(maxScore),
      date: new Date().toLocaleString('fr-FR'),
    })
    fetch('/', { method: 'POST', body }).catch(() => {})
  }

  function resetAttempt() {
    currentAttemptScores.value = {}
    completedExercisesInAttempt.value = []
    lastSessionBalloons.value = 0
  }

  function resetProgress() {
    scoreGlobal.value = 0
    balloons.value = 0
    bestScoresByLesson.value = {}
    attemptHistory.value = []
    resetAttempt()
  }

  return {
    scoreGlobal,
    balloons,
    bestScoresByLesson,
    attemptHistory,
    currentAttemptScores,
    currentAttemptScore,
    completedExercisesInAttempt,
    lastSessionBalloons,
    isLessonCompleted,
    areAllLessonsCompleted,
    submitAnswer,
    finishLesson,
    resetAttempt,
    resetProgress,
  }
})
