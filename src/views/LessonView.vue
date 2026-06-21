<template>
  <div class="lesson">
    <header class="lesson-header">
      <h1 class="lesson-titre">{{ lecon.titre }}</h1>
      <ScoreBadge />
    </header>

    <div v-if="!termine" class="lesson-contenu">
      <p class="progression">Question {{ indexCourant + 1 }} / {{ lecon.exercices.length }}</p>

      <ExerciseQCM
        :exercice="exerciceCourant"
        :key="exerciceCourant.id"
        @reponse-validee="onReponseValidee"
      />

      <FeedbackMessage v-if="feedbackVisible" :correct="derniereReponseCorrecte" />

      <button v-if="feedbackVisible" class="btn-suivant" @click="questionSuivante">
        {{ estDerniereQuestion ? 'Voir mon bilan' : 'Question suivante' }}
      </button>
    </div>

    <LessonBilan
      v-else
      :exercices="lecon.exercices"
      :id-lecon="lecon.id"
      @recommencer="recommencer"
      @menu="allerAuMenu"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'
import ExerciseQCM from '../components/ExerciseQCM.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'
import LessonBilan from '../components/LessonBilan.vue'
import lecon from '../data/lesson-01.json'

const store = useProgressStore()
const router = useRouter()

const indexCourant = ref(0)
const feedbackVisible = ref(false)
const derniereReponseCorrecte = ref(false)
const termine = ref(false)

const exerciceCourant = computed(() => {
  return lecon.exercices[indexCourant.value]
})

const estDerniereQuestion = computed(() => {
  return indexCourant.value === lecon.exercices.length - 1
})

function onReponseValidee({ id, estCorrect, points }) {
  store.validerReponse(lecon.id, id, estCorrect, points)
  derniereReponseCorrecte.value = estCorrect
  feedbackVisible.value = true
}

function questionSuivante() {
  if (estDerniereQuestion.value) {
    termine.value = true
  } else {
    indexCourant.value++
    feedbackVisible.value = false
  }
}

function recommencer() {
  store.resetTentative()
  indexCourant.value = 0
  feedbackVisible.value = false
  termine.value = false
}

function allerAuMenu() {
  store.resetTentative()
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
</style>
