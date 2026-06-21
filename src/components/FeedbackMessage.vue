<template>
  <div class="feedback" :class="correct ? 'feedback-correct' : 'feedback-incorrect'">
    <p class="feedback-texte">{{ correct ? 'Bravo !' : 'Essaie encore !' }}</p>
  </div>
</template>

<script setup>
defineProps({
  correct: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>
.feedback {
  padding: 16px 24px;
  border-radius: 12px;
  text-align: center;
}

.feedback-correct {
  background: #e8f5e9;
  border: 2px solid #2e7d32;
}

.feedback-incorrect {
  background: #ffebee;
  border: 2px solid #c62828;
}

.feedback-texte {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
}

.feedback-correct .feedback-texte {
  color: #1b5e20;
}

.feedback-incorrect .feedback-texte {
  color: #b71c1c;
}
</style>
