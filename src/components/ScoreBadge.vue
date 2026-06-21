<template>
  <div class="score-badge">
    <span class="score-label">Score</span>
    <span class="score-value">{{ store.scoreGlobal }}</span>
  </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progressStore'

const store = useProgressStore()
</script>

<style scoped>
.score-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #e8f5e9;
  border-radius: 20px;
}

.score-label {
  font-size: 14px;
  color: #2e7d32;
  font-weight: 500;
}

.score-value {
  font-size: 20px;
  font-weight: 700;
  color: #1b5e20;
}
</style>
