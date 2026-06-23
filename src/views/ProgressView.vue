<template>
  <div class="progress">
    <header class="progress-header">
      <button class="btn-back" @click="router.push('/')">← Retour</button>
      <ScoreBadge />
    </header>

    <h1 class="titre">Mes progrès</h1>

    <div class="score-global">
      <span class="score-global-label">Score total</span>
      <span class="score-global-value">{{ store.scoreGlobal }} pts</span>
    </div>

    <section v-if="store.attemptHistory.length > 0" class="history">
      <h2 class="section-title">Historique des leçons</h2>
      <ul class="attempts-list">
        <li
          v-for="(attempt, index) in attemptsRecentFirst"
          :key="index"
          class="attempt-card"
        >
          <div class="attempt-info">
            <span class="attempt-lesson">{{ attempt.lessonTitle }}</span>
            <span class="attempt-date">{{ formatDate(attempt.date) }}</span>
          </div>
          <div class="attempt-score">
            <span class="attempt-score-value" :class="scoreClass(attempt)">
              {{ attempt.score }}
            </span>
            <span class="attempt-score-max">/ {{ attempt.maxScore }} pts</span>
          </div>
        </li>
      </ul>
    </section>

    <div v-else class="empty">
      <p>Tu n'as pas encore fait de leçon.</p>
      <button class="btn-start" @click="router.push('/')">Choisir une leçon</button>
    </div>

    <div v-if="store.attemptHistory.length > 0" class="reset-zone">
      <button class="btn-reset" @click="confirmReset">Réinitialiser la progression</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'

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

function scoreClass(attempt) {
  if (attempt.maxScore === 0) return ''
  const ratio = attempt.score / attempt.maxScore
  if (ratio >= 0.8) return 'score--great'
  if (ratio >= 0.5) return 'score--ok'
  return 'score--low'
}

function confirmReset() {
  if (window.confirm('Effacer toute la progression ? Cette action est irréversible.')) {
    store.resetProgress()
  }
}
</script>

<style scoped>
.progress {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-back {
  font-size: 15px;
  color: #1976d2;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-back:hover {
  text-decoration: underline;
}

.titre {
  font-size: 28px;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

.score-global {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: #e3f2fd;
  border-radius: 16px;
  padding: 24px;
}

.score-global-label {
  font-size: 14px;
  color: #1565c0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.score-global-value {
  font-size: 48px;
  font-weight: 700;
  color: #1565c0;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 12px;
  color: #424242;
}

.attempts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attempt-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
}

.attempt-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.attempt-lesson {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
}

.attempt-date {
  font-size: 12px;
  color: #9e9e9e;
}

.attempt-score {
  display: flex;
  align-items: baseline;
  gap: 2px;
  white-space: nowrap;
}

.attempt-score-value {
  font-size: 22px;
  font-weight: 700;
}

.score--great {
  color: #2e7d32;
}

.score--ok {
  color: #f57c00;
}

.score--low {
  color: #c62828;
}

.attempt-score-max {
  font-size: 13px;
  color: #9e9e9e;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 48px 16px;
  text-align: center;
  color: #757575;
  font-size: 16px;
}

.btn-start {
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.btn-start:hover {
  background: #1565c0;
}

.reset-zone {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.btn-reset {
  font-size: 13px;
  color: #9e9e9e;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn-reset:hover {
  color: #c62828;
}
</style>
