<template>
  <div class="progress-view">
    <div class="progress-header">
      <button class="btn-back" @click="router.push('/')">‹ Accueil</button>
    </div>

    <h1 class="page-title">Mes progrès</h1>

    <div class="stats-row">
      <div class="stat-tile stat-tile--amber">
        <span class="stat-label">Score total</span>
        <span class="stat-value">{{ store.scoreGlobal }}</span>
      </div>
      <div class="stat-tile stat-tile--coral">
        <div class="deco-balloon" aria-hidden="true">
          <div class="deco-balloon-body"></div>
          <div class="deco-balloon-knot"></div>
          <div class="deco-balloon-thread"></div>
        </div>
        <span class="stat-label">Ballons</span>
        <span class="stat-value">{{ store.balloons }}</span>
      </div>
    </div>

    <p class="explanation">
      Le score total correspond aux points gagnés dans les exercices. Quand tu termines une leçon à
      100% pour la première fois, tu gagnes un ballon&nbsp;🎈!
    </p>

    <h2 class="section-title">Historique des leçons</h2>

    <div v-if="store.attemptHistory.length > 0" class="history-list">
      <div v-for="(attempt, index) in attemptsRecentFirst" :key="index" class="attempt-card">
        <div class="attempt-info">
          <span class="attempt-lesson">{{ attempt.lessonTitle }}</span>
          <span class="attempt-date">{{ formatDate(attempt.date) }}</span>
        </div>
        <div class="attempt-score">
          <span class="attempt-score-value" :style="{ color: scoreColor(attempt) }">
            {{ attempt.score }}
          </span>
          <span class="attempt-score-max">/ {{ attempt.maxScore }} pts</span>
        </div>
      </div>
    </div>

    <p v-else class="empty-text">Tu n'as pas encore terminé de leçon.</p>

    <div v-if="store.attemptHistory.length > 0" class="reset-zone">
      <button class="btn-reset" @click="confirmReset">Réinitialiser la progression</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'

const router = useRouter()
const store = useProgressStore()

const attemptsRecentFirst = computed(() => [...store.attemptHistory].reverse())

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function scoreColor(attempt) {
  if (attempt.maxScore === 0) return '#A2937F'
  const ratio = attempt.score / attempt.maxScore
  if (ratio >= 0.8) return '#5E7A52'
  if (ratio >= 0.5) return '#C2855F'
  return '#B25B45'
}

function confirmReset() {
  if (window.confirm('Effacer toute la progression ? Cette action est irréversible.')) {
    store.resetProgress()
  }
}
</script>

<style scoped>
.progress-view {
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 24px 48px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.progress-header {
  display: flex;
  align-items: center;
}

.btn-back {
  background: none;
  border: none;
  padding: 6px 4px;
  font-size: 16px;
  font-weight: 700;
  color: #c2855f;
  cursor: pointer;
}

.btn-back:hover {
  text-decoration: underline;
}

.page-title {
  margin: 14px 2px 16px;
  font-size: 26px;
  font-weight: 800;
  color: #4a352b;
  text-align: center;
}

.stats-row {
  display: flex;
  gap: 12px;
}

.stat-tile {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  border-radius: 20px;
  padding: 20px 10px;
}

.stat-tile--amber {
  background: #f6e7ce;
}

.stat-tile--coral {
  background: #f7d9ce;
  position: relative;
  overflow: hidden;
}

.deco-balloon {
  position: absolute;
  bottom: -10px;
  right: -8px;
  opacity: 0.38;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.deco-balloon-body {
  width: 62px;
  height: 76px;
  background: #c25e47;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
}

.deco-balloon-knot {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 9px solid #c25e47;
  margin: 0 auto;
}

.deco-balloon-thread {
  width: 1.5px;
  height: 22px;
  background: #c25e47;
  margin: 0 auto;
  border-radius: 2px;
}

.stat-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-tile--amber .stat-label {
  color: #9a6e2e;
}
.stat-tile--coral .stat-label {
  color: #c25e47;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
}

.stat-tile--amber .stat-value {
  color: #9a6e2e;
}
.stat-tile--coral .stat-value {
  color: #c25e47;
}

.explanation {
  margin: 16px 2px 0;
  font-size: 20px;
  font-weight: 600;
  color: #a2937f;
  line-height: 1.6;
  text-align: center;
}

.section-title {
  margin: 24px 2px 12px;
  font-size: 17px;
  font-weight: 800;
  color: #4a352b;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attempt-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  background: #fffdfb;
  border-radius: 14px;
  box-shadow: 0 8px 20px -16px rgba(74, 53, 43, 0.3);
}

.attempt-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.attempt-lesson {
  font-size: 15px;
  font-weight: 800;
  color: #4a352b;
}

.attempt-date {
  font-size: 12px;
  font-weight: 600;
  color: #a2937f;
}

.attempt-score {
  display: flex;
  align-items: baseline;
  gap: 3px;
  white-space: nowrap;
}

.attempt-score-value {
  font-size: 20px;
  font-weight: 800;
}

.attempt-score-max {
  font-size: 12px;
  font-weight: 600;
  color: #a2937f;
}

.empty-text {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #a2937f;
  padding: 30px 0;
}

.reset-zone {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 24px;
}

.btn-reset {
  font-size: 13px;
  font-weight: 600;
  color: #a2937f;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn-reset:hover {
  color: #b25b45;
}
</style>
