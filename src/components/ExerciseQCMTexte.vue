<template>
  <div class="exercice">
    <div class="texte-lecture">
      <p class="texte-label">Texte à lire</p>
      <p class="texte-contenu">{{ exercise.texte }}</p>
    </div>

    <img
      v-if="exercise.image"
      :src="'/images/' + exercise.image"
      :alt="exercise.question"
      class="exercise-image"
    />

    <p class="question">{{ exercise.question }}</p>

    <div class="choix">
      <button
        v-for="(option, index) in exercise.choix"
        :key="index"
        class="choix-btn"
        :class="{
          correct: answerSubmitted && index === exercise.bonne_reponse,
          incorrect: answerSubmitted && index === selectedAnswer && index !== exercise.bonne_reponse,
        }"
        :disabled="answerSubmitted"
        @click="select(index)"
      >
        {{ option }}
      </button>
    </div>
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

const selectedAnswer = ref(null)
const answerSubmitted = ref(false)

function select(index) {
  if (answerSubmitted.value) return

  selectedAnswer.value = index
  answerSubmitted.value = true

  const isCorrect = index === props.exercise.bonne_reponse

  emit('answer-submitted', {
    id: props.exercise.id,
    isCorrect,
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

.exercise-image {
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  border-radius: 12px;
}

.question {
  font-size: 20px;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.choix {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.choix-btn {
  padding: 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.choix-btn:hover:not(:disabled) {
  border-color: #1976d2;
  background: #e3f2fd;
}

.choix-btn:disabled {
  cursor: default;
}

.choix-btn.correct {
  border-color: #2e7d32;
  background: #e8f5e9;
  color: #1b5e20;
}

.choix-btn.incorrect {
  border-color: #c62828;
  background: #ffebee;
  color: #b71c1c;
}
</style>
