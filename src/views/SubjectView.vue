<template>
  <div class="subject">
    <header class="subject-header">
      <button class="btn-back" @click="router.push('/')">← Retour</button>
      <ScoreBadge />
    </header>

    <div v-if="subject" class="subject-content">
      <div class="subject-intro">
        <p class="subject-icon">{{ subject.icone }}</p>
        <h1 class="subject-title">{{ subject.titre }}</h1>
      </div>

      <div class="levels-grid">
        <button
          v-for="niveau in subject.niveaux"
          :key="niveau.id"
          class="level-card"
          @click="router.push(`/matiere/${subject.id}/${niveau.id}`)"
        >
          <span class="level-title">
            {{ niveau.titre }}
            <span v-if="niveau.nouveau" class="level-badge-new">Nouveau</span>
          </span>
          <span class="level-count">{{ niveau.lessons.length }} leçon{{ niveau.lessons.length !== 1 ? 's' : '' }}</span>
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
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.subject-header {
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

.subject-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.subject-icon {
  font-size: 64px;
  margin: 0;
  line-height: 1;
}

.subject-title {
  font-size: 28px;
  font-weight: 500;
  margin: 0;
}

.levels-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.level-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.2s;
}

.level-card:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.level-title {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

.level-count {
  font-size: 14px;
  color: #757575;
}

.level-badge-new {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: #e53935;
  padding: 2px 8px;
  border-radius: 20px;
  vertical-align: middle;
  margin-left: 8px;
}

.subject-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 64px 16px;
  text-align: center;
  font-size: 18px;
  color: #757575;
}
</style>
