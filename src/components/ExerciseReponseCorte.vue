<template>
  <div class="exercice">
    <div v-if="exercise.texte" class="text-box">
      <p class="text-label">Texte à lire</p>
      <p class="text-content">{{ exercise.texte }}</p>
    </div>

    <p class="question">{{ exercise.question }}</p>

    <input
      v-model="userInput"
      class="answer-input"
      :class="{
        'input--correct':   answerSubmitted && isCorrect,
        'input--incorrect': answerSubmitted && !isCorrect,
      }"
      type="text"
      placeholder="Écris ta réponse ici…"
      :disabled="answerSubmitted"
      @keydown.enter="valider"
    />

    <p v-if="answerSubmitted && !isCorrect" class="correction">
      Bonne réponse : <strong>{{ exercise.bonnes_reponses[0] }}</strong>
    </p>

    <button
      v-if="!answerSubmitted"
      class="btn-valider"
      :disabled="userInput.trim() === ''"
      :style="{ opacity: userInput.trim() === '' ? 0.45 : 1 }"
      @click="valider"
    >
      Valider
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
})

const emit = defineEmits(['answer-submitted'])

const userInput = ref('')
const answerSubmitted = ref(false)
const isCorrect = ref(false)

function normalize(str) {
  return str.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function valider() {
  if (userInput.value.trim() === '' || answerSubmitted.value) return
  const saisie = normalize(userInput.value)
  isCorrect.value = props.exercise.bonnes_reponses.some((r) => normalize(r) === saisie)
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
  gap: 18px;
}

.text-box {
  background: #FBF1E2;
  border-left: 4px solid #E0A48F;
  border-radius: 0 14px 14px 0;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.text-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #C2855F;
  margin: 0;
}

.text-content {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  color: #5C4A3D;
  margin: 0;
}

.question {
  font-size: 22px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.3;
  margin: 0;
}

.answer-input {
  width: 100%;
  font-size: 17px;
  font-weight: 600;
  padding: 16px 18px;
  border: 2px solid #EFE3D2;
  border-radius: 16px;
  background: #FFFDFB;
  color: #4A352B;
  outline: none;
  transition: border-color 0.2s;
}

.answer-input:focus { border-color: #C2855F; }
.answer-input:disabled { cursor: default; }

.input--correct {
  border-color: #A9C29A !important;
  background: #E9F0E2 !important;
  color: #5E7A52 !important;
}

.input--incorrect {
  border-color: #E0A290 !important;
  background: #FBE3DC !important;
  color: #B25B45 !important;
}

.correction {
  font-size: 15px;
  font-weight: 700;
  color: #B25B45;
  text-align: center;
  margin: 0;
}

.btn-valider {
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 30px;
  background: #EFA88C;
  color: #4A352B;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 22px -12px rgba(216, 138, 108, 0.7);
}

.btn-valider:not(:disabled):active { transform: scale(0.98); }
</style>
