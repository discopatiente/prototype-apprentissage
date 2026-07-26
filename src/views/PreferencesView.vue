<template>
  <div class="carnet">
    <div class="carnet-topbar">
      <button class="btn-back" @click="router.push('/')">‹</button>
      <h1 class="carnet-title">Mes préférences et mes goûts</h1>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ 'tab--active': tab.id === activeTabId }"
        :style="tab.id === activeTabId
          ? { background: tab.color, color: '#FFFDFB' }
          : { background: tab.tint, color: tab.color }"
        @click="activeTabId = tab.id"
      >
        <span class="tab-icon">{{ tab.icone }}</span>
        <span class="tab-label">{{ tab.titre }}</span>
      </button>
    </div>

    <div class="questions">
      <div v-for="question in activeTab.questions" :key="question.id" class="question-block">
        <label class="question-label" :for="`${activeTab.id}-${question.id}`">
          {{ question.texte }}
        </label>
        <textarea
          :id="`${activeTab.id}-${question.id}`"
          class="question-input"
          rows="2"
          placeholder="Écris ta réponse ici…"
          :value="store.getAnswer(activeTab.id, question.id)"
          @input="store.setAnswer(activeTab.id, question.id, $event.target.value)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCarnetStore } from '../stores/carnetStore'
import tabs from '../data/preferences.json'

const router = useRouter()
const store = useCarnetStore()

const activeTabId = ref(tabs[0].id)

const activeTab = computed(() => tabs.find((tab) => tab.id === activeTabId.value))
</script>

<style scoped>
.carnet {
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 24px 40px;
  min-height: 100vh;
  background: linear-gradient(180deg, #FBE9DD 0%, #FAF5EF 46%);
}

.carnet-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-back {
  background: none;
  border: none;
  padding: 4px 6px;
  font-size: 22px;
  font-weight: 700;
  color: #C2855F;
  cursor: pointer;
  line-height: 1;
}

.carnet-title {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  color: #4A352B;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 16px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.1s;
}

.tab:active { transform: scale(0.97); }

.tab-icon { font-size: 16px; }

.questions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 22px;
}

.question-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #FFFDFB;
  border-radius: 18px;
  padding: 16px 18px;
  box-shadow: 0 12px 26px -18px rgba(74, 53, 43, 0.35);
}

.question-label {
  font-size: 15px;
  font-weight: 700;
  color: #4A352B;
  line-height: 1.35;
}

.question-input {
  width: 100%;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 14px;
  border: 2px solid #EFE3D2;
  border-radius: 14px;
  background: #FAF5EF;
  color: #4A352B;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
}

.question-input:focus { border-color: #C2855F; }
</style>
