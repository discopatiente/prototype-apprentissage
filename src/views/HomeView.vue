<template>
  <div class="home">
    <div class="home-header">
      <span class="today">{{ today }}</span>
      <ScoreBadge />
    </div>

    <div class="mascot-row">
      <MascottePig size="small" />
      <div class="speech-bubble">
        <div class="bubble-tip"></div>
        <h1 class="greeting">Bonjour Sofia&nbsp;!</h1>
      </div>
    </div>

    <p class="subtitle">Choisis une matière&nbsp;:</p>

    <div class="subjects-grid">
      <button
        v-for="subject in subjects"
        :key="subject.id"
        class="subject-card"
        @click="router.push('/matiere/' + subject.id)"
      >
        <div v-if="subjectHasNew(subject)" class="new-sticker">Nouveau !</div>
        <div class="subject-icon" :style="{ background: subject.tint }">{{ subject.icone }}</div>
        <span class="subject-title">{{ subject.titre }}</span>
        <span class="subject-count" :style="{ color: subject.color, background: subject.tint }">
          {{ totalLessons(subject) }} leçon{{ totalLessons(subject) !== 1 ? 's' : '' }}
        </span>
      </button>
    </div>

    <div class="progress-row">
      <button class="btn-progress" @click="router.push('/progress')">
        <div class="progress-icon">
          <div class="bar bar--s"></div>
          <div class="bar bar--m"></div>
          <div class="bar bar--l"></div>
        </div>
        <span>Mes progrès</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import ScoreBadge from '../components/ScoreBadge.vue'
import MascottePig from '../components/MascottePig.vue'
import subjects from '../data/subjects.json'

const router = useRouter()
const store = useProgressStore()

const today = computed(() => {
  const raw = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
  return raw.charAt(0).toUpperCase() + raw.slice(1)
})

function totalLessons(subject) {
  return subject.niveaux.reduce((sum, n) => sum + n.lessons.length, 0)
}

function subjectHasNew(subject) {
  return subject.niveaux.some((n) => n.nouveau && store.hasUnseenLessons(n.lessons))
}
</script>

<style scoped>
.home {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 24px 48px;
  min-height: 100vh;
  background: linear-gradient(180deg, #FBE9DD 0%, #FAF5EF 46%);
  display: flex;
  flex-direction: column;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

.today {
  font-size: 14px;
  font-weight: 600;
  color: #A2937F;
}

.mascot-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
}

.speech-bubble {
  position: relative;
  flex: 1;
  background: #FFFDFB;
  border-radius: 20px;
  padding: 15px 18px;
  box-shadow: 0 12px 26px -16px rgba(74, 53, 43, 0.32);
}

.bubble-tip {
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 18px;
  height: 18px;
  background: #FFFDFB;
  border-radius: 4px;
}

.greeting {
  position: relative;
  margin: 0;
  font-size: 25px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.15;
}

.subtitle {
  margin: 18px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: #A2937F;
}

.subjects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 14px;
}

.subject-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 14px;
  background: #FFFDFB;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  box-shadow: 0 12px 26px -16px rgba(74, 53, 43, 0.35);
  transition: transform 0.1s;
}

.subject-card:active { transform: scale(0.97); }

.new-sticker {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  font-weight: 800;
  color: white;
  background: #C2855F;
  padding: 3px 9px;
  border-radius: 20px;
  transform: rotate(4deg);
  box-shadow: 0 2px 6px rgba(194, 133, 95, 0.4);
}

.subject-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
}

.subject-title {
  font-size: 18px;
  font-weight: 800;
  color: #4A352B;
}

.subject-count {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 11px;
  border-radius: 14px;
}

.progress-row {
  display: flex;
  justify-content: center;
  margin-top: 26px;
}

.btn-progress {
  display: flex;
  align-items: center;
  gap: 9px;
  background: #F3E7D6;
  border: none;
  padding: 12px 22px;
  border-radius: 22px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #A56A45;
  transition: opacity 0.15s;
}

.btn-progress:active { opacity: 0.7; }

.progress-icon {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}

.bar {
  width: 4px;
  background: #C2855F;
  border-radius: 1px;
}
.bar--s { height: 7px; }
.bar--m { height: 11px; }
.bar--l { height: 14px; }
</style>
