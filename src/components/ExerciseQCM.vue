<template>
  <div class="exercice">
    <p class="question">{{ exercise.question }}</p>

    <div class="choices">
      <button
        v-for="(option, index) in exercise.choix"
        :key="index"
        class="choice-btn"
        :class="{
          'choice--correct':  answerSubmitted && index === exercise.bonne_reponse,
          'choice--wrong':    answerSubmitted && index === selectedAnswer && index !== exercise.bonne_reponse,
          'choice--dimmed':   answerSubmitted && index !== exercise.bonne_reponse && index !== selectedAnswer,
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
  exercise: { type: Object, required: true },
})

const emit = defineEmits(['answer-submitted'])

const selectedAnswer = ref(null)
const answerSubmitted = ref(false)

function select(index) {
  if (answerSubmitted.value) return
  selectedAnswer.value = index
  answerSubmitted.value = true
  emit('answer-submitted', {
    id: props.exercise.id,
    isCorrect: index === props.exercise.bonne_reponse,
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

.question {
  font-size: 22px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.3;
  margin: 0;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.choice-btn {
  width: 100%;
  text-align: left;
  padding: 17px 20px;
  font-size: 18px;
  font-weight: 700;
  border: 2px solid #EFE3D2;
  border-radius: 18px;
  background: #FFFDFB;
  color: #4A352B;
  cursor: pointer;
  transition: transform 0.1s;
}

.choice-btn:hover:not(:disabled) {
  border-color: #C2855F;
  background: #FBF1E2;
}

.choice-btn:disabled { cursor: default; }

.choice--correct {
  background: #E9F0E2 !important;
  border-color: #A9C29A !important;
  color: #5E7A52 !important;
}

.choice--wrong {
  background: #FBE3DC !important;
  border-color: #E0A290 !important;
  color: #B25B45 !important;
}

.choice--dimmed {
  background: #FAF5EF !important;
  border-color: #F0E8DC !important;
  color: #BCAF9E !important;
}
</style>
