import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProgressStore = defineStore('progress', () => {
  const scoreGlobal = ref(0)
  const meilleurScoresParLecon = ref({})
  const scoresTentativeCourante = ref({})
  const exercicesReussisTentative = ref([])

  const scoreTentativeCourante = computed(() => {
    return Object.values(scoresTentativeCourante.value).reduce((a, b) => a + b, 0)
  })

  function validerReponse(idLecon, idExercice, estCorrect, points) {
    if (estCorrect && !exercicesReussisTentative.value.includes(idExercice)) {
      scoresTentativeCourante.value[idExercice] = points
      exercicesReussisTentative.value.push(idExercice)
    } else if (!estCorrect) {
      scoresTentativeCourante.value[idExercice] = 0
    }
  }

  function terminerLecon(idLecon) {
    const scoreTentative = scoreTentativeCourante.value
    const ancienMeilleur = meilleurScoresParLecon.value[idLecon] || 0

    if (scoreTentative > ancienMeilleur) {
      const gain = scoreTentative - ancienMeilleur
      scoreGlobal.value += gain
      meilleurScoresParLecon.value[idLecon] = scoreTentative
    }
  }

  function resetTentative() {
    scoresTentativeCourante.value = {}
    exercicesReussisTentative.value = []
  }

  return {
    scoreGlobal,
    meilleurScoresParLecon,
    scoresTentativeCourante,
    scoreTentativeCourante,
    exercicesReussisTentative,
    validerReponse,
    terminerLecon,
    resetTentative,
  }
})
