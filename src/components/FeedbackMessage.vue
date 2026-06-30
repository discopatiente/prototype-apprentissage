<template>
  <div class="feedback" :class="correct ? 'feedback--correct' : 'feedback--incorrect'">
    <span class="feedback-text">{{ correct ? 'Bravo !' : 'Essaie encore !' }}</span>
  </div>
</template>

<script setup>
defineProps({
  correct: { type: Boolean, required: true },
})
</script>

<style scoped>
.feedback {
  padding: 13px 20px;
  border-radius: 16px;
  text-align: center;
  border: 2px solid;
}

.feedback--correct {
  background: #E9F0E2;
  border-color: #A9C29A;
}

.feedback--incorrect {
  background: #FBE3DC;
  border-color: #E0A290;
}

.feedback-text {
  font-size: 18px;
  font-weight: 800;
}

.feedback--correct .feedback-text  { color: #5E7A52; }
.feedback--incorrect .feedback-text { color: #B25B45; }
</style>
