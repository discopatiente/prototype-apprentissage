<template>
  <div class="bilan">
    <div v-if="percentage >= 50" class="reward-overlay" aria-hidden="true">
      <div
        v-for="(p, i) in burstParticles"
        :key="'p' + i"
        class="burst-particle"
        :style="p.style"
      ></div>
      <div
        v-for="(b, i) in risingBalloons"
        :key="'b' + i"
        class="rising-balloon"
        :style="b.wrapStyle"
      >
        <div class="balloon-body" :style="{ background: b.color }"></div>
        <div class="balloon-string" :style="{ background: b.color }"></div>
      </div>
    </div>

    <div class="bilan-content">
      <MascottePig size="large" class="mascot" />

      <h1 class="bilan-title">{{ title }}</h1>
      <p class="bilan-message">{{ message }}</p>

      <div class="recap-card">
        <div class="recap-balloons">
          <div class="balloon-icon"></div>
          <div class="balloon-string-icon"></div>
          <span class="balloons-count">+{{ sessionBalloons }}</span>
        </div>
        <div class="recap-divider"></div>
        <div class="recap-score">
          <div class="diamond-icon"></div>
          <span class="score-value">{{ attemptScore }} pts</span>
        </div>
      </div>

      <div class="questions-list">
        <div
          v-for="exercise in exercises"
          :key="exercise.id"
          class="question-row"
          :class="isPassed(exercise.id) ? 'row--passed' : 'row--failed'"
        >
          <span class="question-text">{{ exercise.question }}</span>
          <span class="question-pts">
            {{ isPassed(exercise.id) ? '+' + exercise.points + ' pts' : '0 pt' }}
          </span>
        </div>
      </div>

      <div class="bilan-actions">
        <button class="btn-restart" @click="emit('restart')">Recommencer</button>
        <button class="btn-level" @click="emit('go-to-level')">Retour aux leçons</button>
        <button class="btn-menu" @click="emit('go-to-menu')">Menu principal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProgressStore } from '../stores/progressStore'
import MascottePig from './MascottePig.vue'

const props = defineProps({
  exercises: { type: Array, required: true },
  idLesson:  { type: String, required: true },
})

const emit = defineEmits(['restart', 'go-to-level', 'go-to-menu'])

const store = useProgressStore()

const attemptScore = computed(() => store.currentAttemptScore)

const sessionBalloons = computed(() => store.completedExercisesInAttempt.length)

const percentage = computed(() => {
  const maxScore = props.exercises.reduce((a, e) => a + e.points, 0)
  return maxScore === 0 ? 0 : Math.round((attemptScore.value / maxScore) * 100)
})

const title = computed(() => {
  if (percentage.value === 100) return 'Parfait !'
  if (percentage.value >= 50)  return 'Bien joué !'
  return 'Continue comme ça !'
})

const message = computed(() => {
  if (percentage.value === 100) return 'Tu as tout bon, bravo !'
  if (percentage.value >= 50)  return 'Tu progresses bien, continue !'
  return 'Recommence pour faire encore mieux !'
})

function isPassed(exerciseId) {
  return store.completedExercisesInAttempt.includes(`${props.idLesson}/${exerciseId}`)
}

const COLORS = ['#DD8A78', '#D9A85F', '#A9C29A', '#EFA88C', '#AEB6D6']

const burstParticles = computed(() => {
  const centers = [
    { x: 95,  y: 120, delay: 0.1 },
    { x: 295, y: 90,  delay: 0.5 },
    { x: 195, y: 200, delay: 0.9 },
  ]
  const particles = []
  centers.forEach((c, ci) => {
    for (let k = 0; k < 12; k++) {
      const ang = (k / 12) * Math.PI * 2
      const dist = 72
      particles.push({
        style: {
          left: c.x + 'px',
          top: c.y + 'px',
          background: COLORS[(ci + k) % COLORS.length],
          '--tx': Math.cos(ang) * dist + 'px',
          '--ty': Math.sin(ang) * dist + 'px',
          animation: `burst 1.1s ease-out ${c.delay}s forwards`,
        },
      })
    }
  })
  return particles
})

const risingBalloons = computed(() =>
  Array.from({ length: 9 }, (_, i) => ({
    color: COLORS[i % COLORS.length],
    wrapStyle: {
      left: 24 + ((i * 41) % 330) + 'px',
      animation: `rise ${3.4 + (i % 4) * 0.5}s ease-in ${0.2 + (i % 5) * 0.35}s forwards`,
    },
  })),
)
</script>

<style scoped>
.bilan {
  background: linear-gradient(180deg, #FBE9DD 0%, #FAF5EF 58%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.reward-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.burst-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
}

.rising-balloon {
  position: absolute;
  bottom: -40px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.balloon-body {
  width: 26px;
  height: 32px;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
}

.balloon-string {
  width: 2px;
  height: 10px;
  opacity: 0.5;
}

.bilan-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 28px 40px;
  max-width: 480px;
  margin: 0 auto;
}

.mascot {
  animation: popIn 0.5s ease-out both;
  margin-top: 6px;
}

.bilan-title {
  margin: 16px 0 4px;
  font-size: 29px;
  font-weight: 800;
  color: #4A352B;
  text-align: center;
}

.bilan-message {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #A2937F;
  text-align: center;
}

.recap-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #FFFDFB;
  padding: 14px 22px;
  border-radius: 22px;
  box-shadow: 0 12px 26px -16px rgba(74, 53, 43, 0.35);
}

.recap-balloons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.balloon-icon {
  width: 18px;
  height: 23px;
  background: #DD8A78;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
}

.balloon-string-icon {
  width: 2px;
  height: 6px;
  background: #DD8A78;
  opacity: 0.5;
  margin-left: -8px;
  margin-top: 20px;
  align-self: flex-start;
}

.balloons-count {
  font-size: 20px;
  font-weight: 800;
  color: #C25E47;
}

.recap-divider {
  width: 1px;
  height: 28px;
  background: #EEE3D2;
}

.recap-score {
  display: flex;
  align-items: center;
  gap: 8px;
}

.diamond-icon {
  width: 16px;
  height: 16px;
  background: #D9A85F;
  transform: rotate(45deg);
  border-radius: 3px;
}

.score-value {
  font-size: 20px;
  font-weight: 800;
  color: #9A6E2E;
}

.questions-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 20px;
}

.question-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 11px 15px;
  border-radius: 12px;
}

.row--passed { background: #E9F0E2; }
.row--failed { background: #FBE3DC; }

.question-text {
  flex: 1;
  font-size: 13px;
  font-weight: 600;
}

.row--passed .question-text { color: #5E7A52; }
.row--failed .question-text { color: #B25B45; }

.question-pts {
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
}

.row--passed .question-pts { color: #5E7A52; }
.row--failed .question-pts { color: #B25B45; }

.bilan-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}

.btn-restart {
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 30px;
  background: #EFA88C;
  color: #4A352B;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 26px -14px rgba(216, 138, 108, 0.75);
}

.btn-restart:active { transform: scale(0.98); }

.btn-level {
  width: 100%;
  height: 56px;
  border: 2px solid #E8B79F;
  border-radius: 28px;
  background: #FFFDFB;
  color: #C2855F;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
}

.btn-level:active { transform: scale(0.98); }

.btn-menu {
  width: 100%;
  height: 44px;
  border: none;
  background: none;
  color: #B6A998;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.btn-menu:active { opacity: 0.6; }
</style>
