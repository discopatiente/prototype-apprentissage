<template>
  <div class="subject">
    <div class="subject-header">
      <button class="btn-back" @click="router.push('/')">‹ Accueil</button>
      <ScoreBadge />
    </div>

    <div v-if="subject" class="subject-content">
      <div class="subject-intro">
        <div class="subject-icon" :style="{ background: subject.tint }">{{ subject.icone }}</div>
        <h1 class="subject-title">{{ subject.titre }}</h1>
        <p class="subject-subtitle">Choisis ton niveau&nbsp;:</p>
      </div>

      <div class="levels-list">
        <button
          v-for="niveau in subject.niveaux"
          :key="niveau.id"
          class="level-card"
          @click="router.push(`/matiere/${subject.id}/${niveau.id}`)"
        >
          <span class="level-title">
            {{ niveau.titre }}
            <span v-if="niveau.nouveau" class="badge-new">Nouveau</span>
          </span>
          <span class="level-count">
            {{ niveau.lessons.length }} leçon{{ niveau.lessons.length !== 1 ? 's' : '' }}
          </span>
        </button>
      </div>
    </div>

    <div v-else class="subject-error">
      <p>Cette matière n'existe pas.</p>
      <button class="btn-back" @click="router.push('/')">Retour au menu</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScoreBadge from '../components/ScoreBadge.vue'
import subjectsData from '../data/subjects.json'

const route = useRoute()
const router = useRouter()

const subject = computed(() => subjectsData.find((s) => s.id === route.params.matiereId) ?? null)
</script>

<style scoped>
.subject {
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 24px 48px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.subject-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-back {
  background: none;
  border: none;
  padding: 6px 4px;
  font-size: 16px;
  font-weight: 700;
  color: #C2855F;
  cursor: pointer;
}

.btn-back:hover { text-decoration: underline; }

.subject-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  margin-top: 18px;
}

.subject-icon {
  width: 84px;
  height: 84px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
}

.subject-title {
  margin: 8px 0 0;
  font-size: 26px;
  font-weight: 800;
  color: #4A352B;
}

.subject-subtitle {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #A2937F;
}

.levels-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.level-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  background: #FFFDFB;
  border: none;
  border-radius: 20px;
  padding: 22px;
  cursor: pointer;
  box-shadow: 0 10px 24px -16px rgba(74, 53, 43, 0.35);
  transition: transform 0.1s;
}

.level-card:active { transform: scale(0.985); }

.level-title {
  font-size: 19px;
  font-weight: 800;
  color: #4A352B;
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge-new {
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: #C2855F;
  padding: 2px 8px;
  border-radius: 20px;
}

.level-count {
  font-size: 14px;
  font-weight: 700;
  color: #A2937F;
}

.subject-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 64px 0;
  text-align: center;
  font-size: 16px;
  color: #A2937F;
}
</style>
