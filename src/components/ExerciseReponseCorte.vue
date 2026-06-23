<template>
  <div class="exercice">
    <div v-if="exercise.texte" class="texte-lecture">
      <p class="texte-label">Texte à lire</p>
      <p class="texte-contenu">{{ exercise.texte }}</p>
    </div>

    <p class="question">{{ exercise.question }}</p>

    <div class="reponse-zone">
      <input
        v-model="userInput"
        class="reponse-input"
        :class="{
          correct: answerSubmitted && isCorrect,
          incorrect: answerSubmitted && !isCorrect,
        }"
        type="text"
        placeholder="Écris ta réponse ici…"
        :disabled="answerSubmitted"
        @keydown.enter="valider"
      />

      <button
        class="btn-valider"
        :disabled="userInput.trim() === '' || answerSubmitted"
        @click="valider"
      >
        Valider
      </button>
    </div>

    <p v-if="answerSubmitted && !isCorrect" class="correction">
      Bonne réponse : <strong>{{ exercise.bonnes_reponses[0] }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answer-submitted'])

const userInput = ref('')
const answerSubmitted = ref(false)
const isCorrect = ref(false)

function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function valider() {
  if (userInput.value.trim() === '' || answerSubmitted.value) return

  const saisie = normalize(userInput.value)
  isCorrect.value = props.exercise.bonnes_reponses.some(
    (r) => normalize(r) === saisie,
  )
  answerSubmitted.value = true

  emit('answer-submitted', {
    id: props.exercise.id,
    isCorrect: isCorrect.value,
    points: props.exercise.points,
  })
}
</script>

<style scoped>
.exercice {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.texte-lecture {
  background: #fffde7;
  border-left: 4px solid #f9a825;
  border-radius: 0 12px 12px 0;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.texte-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #f57f17;
  margin: 0;
}

.texte-contenu {
  font-size: 17px;
  line-height: 1.7;
  color: #1a1a1a;
  margin: 0;
}

.question {
  font-size: 20px;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.reponse-zone {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.reponse-input {
  flex: 1;
  font-size: 17px;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s;
}

.reponse-input:focus {
  border-color: #1976d2;
}

.reponse-input:disabled {
  cursor: default;
}

.reponse-input.correct {
  border-color: #2e7d32;
  background: #e8f5e9;
  color: #1b5e20;
}

.reponse-input.incorrect {
  border-color: #c62828;
  background: #ffebee;
  color: #b71c1c;
}

.btn-valider {
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-valider:hover:not(:disabled) {
  background: #1565c0;
}

.btn-valider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.correction {
  font-size: 15px;
  color: #c62828;
  margin: 0;
  text-align: center;
}
</style>
