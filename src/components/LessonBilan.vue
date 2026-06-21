<template>
  <div class="bilan">
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>

    <div class="bilan-contenu">
      <p class="bilan-emoji">{{ emoji }}</p>
      <h2 class="bilan-titre">{{ titre }}</h2>
      <p class="bilan-phrase">{{ phrase }}</p>

      <div class="score-total">
        <span class="score-total-label">Score de cette leçon</span>
        <span class="score-total-valeur">{{ scoreTentative }} pts</span>
      </div>

      <div class="questions-liste">
        <div
          v-for="exercice in exercices"
          :key="exercice.id"
          class="question-ligne"
          :class="aReussi(exercice.id) ? 'reussi' : 'rate'"
        >
          <span class="question-texte">{{ exercice.question }}</span>
          <span class="question-points">
            {{ aReussi(exercice.id) ? '+' + exercice.points + ' pts' : '0 pt' }}
          </span>
        </div>
      </div>

      <div class="bilan-actions">
        <button class="btn-secondaire" @click="emit('recommencer')">Recommencer</button>
        <button class="btn-principal" @click="emit('menu')">Menu principal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProgressStore } from '../stores/progressStore'

const props = defineProps({
  exercices: {
    type: Array,
    required: true,
  },
  idLecon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['recommencer', 'menu'])

const store = useProgressStore()
const confettiCanvas = ref(null)

const scoreTentative = computed(() => store.scoreTentativeCourante)

const pourcentage = computed(() => {
  const scoreMax = props.exercices.reduce((a, e) => a + e.points, 0)
  return scoreMax === 0 ? 0 : Math.round((scoreTentative.value / scoreMax) * 100)
})

const emoji = computed(() => {
  if (pourcentage.value === 100) return '🌟'
  if (pourcentage.value >= 50) return '😊'
  return '💪'
})

const titre = computed(() => {
  if (pourcentage.value === 100) return 'Parfait !'
  if (pourcentage.value >= 50) return 'Bien joué !'
  return 'Continue comme ça !'
})

const phrase = computed(() => {
  if (pourcentage.value === 100) return 'Tu as tout bon, bravo !'
  if (pourcentage.value >= 50) return 'Tu progresses bien, continue !'
  return 'Recommence pour faire encore mieux !'
})

function aReussi(idExercice) {
  return store.exercicesReussisTentative.includes(idExercice)
}

function lancerConfettis() {
  const canvas = confettiCanvas.value
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const confettis = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    taille: Math.random() * 8 + 4,
    couleur: ['#1976d2', '#2e7d32', '#f57c00', '#c62828', '#7b1fa2'][Math.floor(Math.random() * 5)],
    vitesse: Math.random() * 3 + 2,
    oscillation: Math.random() * 2 - 1,
  }))

  let frame = 0

  function animer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    confettis.forEach((c) => {
      c.y += c.vitesse
      c.x += c.oscillation
      ctx.fillStyle = c.couleur
      ctx.fillRect(c.x, c.y, c.taille, c.taille)
    })
    frame++
    if (frame < 180) requestAnimationFrame(animer)
    else ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  animer()
}

onMounted(() => {
  store.terminerLecon(props.idLecon)
  if (pourcentage.value >= 50) lancerConfettis()
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
  gap: 12px;
  margin-top: 8px;
}

.btn-principal {
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
</style>
