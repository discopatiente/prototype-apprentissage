<template>
  <div class="exercice">
    <p class="question">{{ exercice.question }}</p>

    <div class="choix">
      <button
        v-for="(choix, index) in exercice.choix"
        :key="index"
        class="choix-btn"
        :class="{
          correct: reponseValidee && index === exercice.bonne_reponse,
          incorrect: reponseValidee && index === reponseChoisie && index !== exercice.bonne_reponse,
        }"
        :disabled="reponseValidee"
        @click="choisir(index)"
      >
        {{ choix }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  exercice: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['reponse-validee'])

const reponseChoisie = ref(null)
const reponseValidee = ref(false)

function choisir(index) {
  if (reponseValidee.value) return

  reponseChoisie.value = index
  reponseValidee.value = true

  const estCorrect = index === props.exercice.bonne_reponse

  emit('reponse-validee', {
    id: props.exercice.id,
    estCorrect,
    points: props.exercice.points,
  })
}
</script>

<style scoped>
.exercice {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question {
  font-size: 22px;
  font-weight: 500;
  color: #1a1a1a;
  text-align: center;
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
