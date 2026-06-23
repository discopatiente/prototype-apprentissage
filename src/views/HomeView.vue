<template>
  <div class="home">
    <header class="home-header">
      <ScoreBadge />
    </header>

    <h1 class="titre">Bonjour !</h1>
    <p class="description">Choisis un thème pour commencer :</p>

    <div class="themes-grid">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        :class="{ 'theme-card--disabled': theme.lessons.length === 0 }"
        :disabled="theme.lessons.length === 0"
        @click="router.push('/theme/' + theme.id)"
      >
        <span class="theme-icon">{{ theme.icone }}</span>
        <span class="theme-title">{{ theme.titre }}</span>
        <span class="theme-description">{{ theme.description }}</span>
        <span v-if="theme.lessons.length === 0" class="theme-soon">Bientôt disponible</span>
        <span v-else class="theme-count">
          {{ theme.lessons.length }} leçon{{ theme.lessons.length > 1 ? 's' : '' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ScoreBadge from '../components/ScoreBadge.vue'
import themes from '../data/themes.json'

const router = useRouter()
</script>

<style scoped>
.home {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-header {
  display: flex;
  justify-content: flex-end;
}

.titre {
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

.description {
  font-size: 18px;
  color: #757575;
  margin: 0;
  text-align: center;
}

.themes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 8px;
}

.theme-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
}

.theme-card:hover:not(:disabled) {
  border-color: #1976d2;
  background: #e3f2fd;
}

.theme-card--disabled {
  opacity: 0.5;
  cursor: default;
}

.theme-icon {
  font-size: 48px;
  line-height: 1;
}

.theme-title {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

.theme-description {
  font-size: 13px;
  color: #757575;
  line-height: 1.4;
}

.theme-count {
  font-size: 12px;
  font-weight: 500;
  color: #1976d2;
  background: #e3f2fd;
  padding: 4px 10px;
  border-radius: 20px;
}

.theme-soon {
  font-size: 12px;
  font-weight: 500;
  color: #9e9e9e;
  background: #f5f5f5;
  padding: 4px 10px;
  border-radius: 20px;
}
</style>
