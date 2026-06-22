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
  const bestScoresByLesson = ref(savedData?.bestScoresByLesson ?? {})
  const currentAttemptScores = ref({})
  const completedExercisesInAttempt = ref([])

  watch(
    [scoreGlobal, bestScoresByLesson],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          scoreGlobal: scoreGlobal.value,
          bestScoresByLesson: bestScoresByLesson.value,
        }),
      )
    },
    { deep: true },
  )

  const currentAttemptScore = computed(() => {
    return Object.values(currentAttemptScores.value).reduce((a, b) => a + b, 0)
  })

  function submitAnswer(lessonId, exerciseId, isCorrect, points) {
    const key = `${lessonId}/${exerciseId}`
    if (isCorrect && !completedExercisesInAttempt.value.includes(key)) {
      currentAttemptScores.value[key] = points
      completedExercisesInAttempt.value.push(key)
    } else if (!isCorrect) {
      currentAttemptScores.value[key] = 0
    }
  }

  function finishLesson(lessonId) {
    const attemptScore = currentAttemptScore.value
    const previousBest = bestScoresByLesson.value[lessonId] || 0

    if (attemptScore > previousBest) {
      const improvement = attemptScore - previousBest
      scoreGlobal.value += improvement
      bestScoresByLesson.value[lessonId] = attemptScore
    }
  }

  function resetAttempt() {
    currentAttemptScores.value = {}
    completedExercisesInAttempt.value = []
  }

  return {
    scoreGlobal,
    bestScoresByLesson,
    currentAttemptScores,
    currentAttemptScore,
    completedExercisesInAttempt,
    submitAnswer,
    finishLesson,
    resetAttempt,
  }
})
