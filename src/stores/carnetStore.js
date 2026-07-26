import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'apprentissage-carnet'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const useCarnetStore = defineStore('carnet', () => {
  const savedData = loadFromStorage()

  const answers = ref(savedData?.answers ?? {})

  watch(
    answers,
    () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: answers.value }))
    },
    { deep: true },
  )

  function getAnswer(tabId, questionId) {
    return answers.value[`${tabId}/${questionId}`] ?? ''
  }

  function setAnswer(tabId, questionId, text) {
    answers.value[`${tabId}/${questionId}`] = text
  }

  return {
    answers,
    getAnswer,
    setAnswer,
  }
})
