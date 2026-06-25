<template>
  <div class="bilan">
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>

    <div class="bilan-contenu">
      <p class="bilan-emoji">{{ emoji }}</p>
      <h2 class="bilan-titre">{{ title }}</h2>
      <p class="bilan-phrase">{{ message }}</p>

      <div class="score-total">
        <span class="score-total-label">Score de cette leçon</span>
        <span class="score-total-valeur">{{ attemptScore }} pts</span>
      </div>

      <div class="questions-liste">
        <div
          v-for="exercise in exercises"
          :key="exercise.id"
          class="question-ligne"
          :class="isPassed(exercise.id) ? 'reussi' : 'rate'"
        >
          <span class="question-texte">{{ exercise.question }}</span>
          <span class="question-points">
            {{ isPassed(exercise.id) ? '+' + exercise.points + ' pts' : '0 pt' }}
          </span>
        </div>
      </div>

      <div class="bilan-actions">
        <button class="btn-principal" @click="emit('restart')">Recommencer</button>
        <button class="btn-secondaire" @click="emit('go-to-level')">Retour aux leçons</button>
        <button class="btn-tertiaire" @click="emit('go-to-menu')">Menu principal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProgressStore } from '../stores/progressStore'

const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },
  idLesson: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['restart', 'go-to-level', 'go-to-menu'])

const store = useProgressStore()
const confettiCanvas = ref(null)

const attemptScore = computed(() => store.currentAttemptScore)

const percentage = computed(() => {
  const maxScore = props.exercises.reduce((a, e) => a + e.points, 0)
  return maxScore === 0 ? 0 : Math.round((attemptScore.value / maxScore) * 100)
})

const emoji = computed(() => {
  if (percentage.value === 100) return '🌟'
  if (percentage.value >= 50) return '😊'
  return '💪'
})

const title = computed(() => {
  if (percentage.value === 100) return 'Parfait !'
  if (percentage.value >= 50) return 'Bien joué !'
  return 'Continue comme ça !'
})

const message = computed(() => {
  if (percentage.value === 100) return 'Tu as tout bon, bravo !'
  if (percentage.value >= 50) return 'Tu progresses bien, continue !'
  return 'Recommence pour faire encore mieux !'
})

function isPassed(exerciseId) {
  return store.completedExercisesInAttempt.includes(`${props.idLesson}/${exerciseId}`)
}

function launchConfetti() {
  const canvas = confettiCanvas.value
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    color: ['#1976d2', '#2e7d32', '#f57c00', '#c62828', '#7b1fa2'][Math.floor(Math.random() * 5)],
    speed: Math.random() * 3 + 2,
    wobble: Math.random() * 2 - 1,
  }))

  let frame = 0

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pieces.forEach((p) => {
      p.y += p.speed
      p.x += p.wobble
      ctx.fillStyle = p.color
      ctx.fillRect(p.x, p.y, p.size, p.size)
    })
    frame++
    if (frame < 180) requestAnimationFrame(animate)
    else ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  animate()
}

onMounted(() => {
  if (percentage.value >= 50) launchConfetti()
})
</script>

<style scoped>
.bilan {
  position: relative;
}

.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bilan-contenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 16px;
  position: relative;
  z-index: 1;
}

.bilan-emoji {
  font-size: 64px;
  margin: 0;
}

.bilan-titre {
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

.bilan-phrase {
  font-size: 18px;
  color: #757575;
  margin: 0;
  text-align: center;
}

.score-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: #e8f5e9;
  border-radius: 16px;
  padding: 20px 48px;
}

.score-total-label {
  font-size: 14px;
  color: #2e7d32;
}

.score-total-valeur {
  font-size: 48px;
  font-weight: 500;
  color: #1b5e20;
}

.questions-liste {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-ligne {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
}

.question-ligne.reussi {
  background: #e8f5e9;
  color: #1b5e20;
}

.question-ligne.rate {
  background: #ffebee;
  color: #b71c1c;
}

.question-texte {
  flex: 1;
  margin-right: 12px;
}

.question-points {
  font-weight: 500;
  white-space: nowrap;
}

.bilan-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
  max-width: 320px;
}

.btn-principal {
  width: 100%;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.btn-principal:hover {
  background: #1565c0;
}

.btn-secondaire {
  width: 100%;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 500;
  background: white;
  color: #1976d2;
  border: 2px solid #1976d2;
  border-radius: 12px;
  cursor: pointer;
}

.btn-secondaire:hover {
  background: #e3f2fd;
}

.btn-tertiaire {
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.btn-tertiaire:hover {
  color: #757575;
  text-decoration: underline;
}
</style>
