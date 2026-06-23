<template>
  <div class="admin">
    <header class="admin-header">
      <span class="admin-title">Administration</span>
      <button class="btn-logout" @click="authStore.logout()">Déconnexion</button>
    </header>

    <h2 class="section-title">Créer une leçon</h2>

    <form class="form" @submit.prevent>
      <div class="form-group">
        <label>Thème</label>
        <select v-model="selectedTheme">
          <option value="" disabled>-- Choisir un thème --</option>
          <option v-for="theme in themes" :key="theme.id" :value="theme.id">
            {{ theme.icone }} {{ theme.titre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Numéro de la leçon</label>
        <input v-model="lessonSuffix" placeholder="ex: 02" />
        <span class="id-preview">ID généré : {{ lessonId }}</span>
      </div>

      <div class="form-group">
        <label>Titre</label>
        <input v-model="titre" placeholder="Les animaux de la ferme" />
      </div>

      <div class="form-group">
        <label>Description</label>
        <input v-model="description" placeholder="Apprends à reconnaître les animaux !" />
      </div>

      <div class="exercices-section">
        <div class="exercices-header">
          <h3>Exercices ({{ exercices.length }})</h3>
          <button type="button" class="btn-add" @click="addExercice">+ Ajouter</button>
        </div>

        <div v-for="(ex, i) in exercices" :key="i" class="exercice-card">
          <div class="exercice-header">
            <span class="exercice-num">Question {{ i + 1 }}</span>
            <button type="button" class="btn-remove" @click="removeExercice(i)">Supprimer</button>
          </div>

          <div class="form-group">
            <label>Question</label>
            <input v-model="ex.question" placeholder="Quel animal fait « meuh » ?" />
          </div>

          <div class="form-group form-group--inline">
            <label>Points</label>
            <input v-model.number="ex.points" type="number" min="1" class="input-points" />
          </div>

          <div class="choices-group">
            <label>Choix <span class="choices-hint">(coche la bonne réponse)</span></label>
            <div v-for="(_, j) in ex.choix" :key="j" class="choice-row">
              <input
                type="radio"
                :name="`bonne_reponse_${i}`"
                :value="j"
                v-model="ex.bonne_reponse"
              />
              <input
                v-model="ex.choix[j]"
                :placeholder="`Choix ${j + 1}`"
                class="choice-input"
              />
            </div>
          </div>
        </div>

        <p v-if="exercices.length === 0" class="empty-exercises">
          Aucun exercice pour l'instant. Clique sur "+ Ajouter".
        </p>
      </div>

      <div class="download-section">
        <button
          type="button"
          class="btn-download"
          :disabled="!isFormValid"
          @click="downloadJson"
        >
          Télécharger le fichier JSON
        </button>
        <p v-if="!isFormValid" class="form-hint">
          Remplis tous les champs et ajoute au moins un exercice complet.
        </p>
      </div>
    </form>

    <div class="instructions">
      <h3>Après le téléchargement</h3>
      <ol>
        <li>
          Place le fichier <code>{{ lessonId }}.json</code> dans
          <code>src/data/</code>
        </li>
        <li>
          Dans <code>src/data/themes.json</code>, ajoute
          <code>"{{ lessonId }}"</code> au tableau <code>lessons</code> du thème
          <em>{{ selectedTheme || '…' }}</em>
        </li>
        <li>Fais un <code>git push</code> — Netlify redéploie automatiquement</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import themes from '../data/themes.json'

const authStore = useAuthStore()

const selectedTheme = ref('')
const lessonSuffix = ref('')
const titre = ref('')
const description = ref('')
const exercices = ref([])

const lessonId = computed(() =>
  selectedTheme.value && lessonSuffix.value
    ? `lesson-${selectedTheme.value}-${lessonSuffix.value}`
    : 'lesson-…-…',
)

const isFormValid = computed(() => {
  if (!selectedTheme.value || !lessonSuffix.value || !titre.value) return false
  if (exercices.value.length === 0) return false
  return exercices.value.every(
    (ex) => ex.question.trim() && ex.choix.every((c) => c.trim()),
  )
})

function addExercice() {
  exercices.value.push({
    question: '',
    choix: ['', '', '', ''],
    bonne_reponse: 0,
    points: 10,
  })
}

function removeExercice(index) {
  exercices.value.splice(index, 1)
}

function downloadJson() {
  const data = {
    id: lessonId.value,
    theme: selectedTheme.value,
    titre: titre.value,
    description: description.value,
    exercices: exercices.value.map((ex, i) => ({
      id: `ex-${String(i + 1).padStart(2, '0')}`,
      type: 'qcm',
      question: ex.question,
      image: null,
      choix: ex.choix,
      bonne_reponse: ex.bonne_reponse,
      points: ex.points,
    })),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${lessonId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.admin {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.btn-logout {
  font-size: 14px;
  color: #757575;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
}

.btn-logout:hover {
  background: #f5f5f5;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group--inline {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #424242;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-group input,
.form-group select {
  font-size: 15px;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #1976d2;
}

.input-points {
  width: 80px;
}

.id-preview {
  font-size: 13px;
  color: #9e9e9e;
  font-family: monospace;
}

.exercices-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exercices-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.exercices-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.btn-add {
  font-size: 14px;
  font-weight: 500;
  color: #1976d2;
  background: #e3f2fd;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-add:hover {
  background: #bbdefb;
}

.exercice-card {
  border: 2px solid #e0e0e0;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exercice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exercice-num {
  font-size: 14px;
  font-weight: 600;
  color: #616161;
}

.btn-remove {
  font-size: 13px;
  color: #c62828;
  background: none;
  border: 1px solid #ffcdd2;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}

.btn-remove:hover {
  background: #ffebee;
}

.choices-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.choices-group > label {
  font-size: 13px;
  font-weight: 600;
  color: #424242;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.choices-hint {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: #9e9e9e;
}

.choice-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.choice-input {
  flex: 1;
  font-size: 15px;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
}

.choice-input:focus {
  border-color: #1976d2;
}

.empty-exercises {
  font-size: 14px;
  color: #9e9e9e;
  text-align: center;
  padding: 24px;
  border: 2px dashed #e0e0e0;
  border-radius: 14px;
  margin: 0;
}

.download-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.btn-download {
  font-size: 16px;
  font-weight: 600;
  padding: 14px 32px;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.btn-download:hover:not(:disabled) {
  background: #1b5e20;
}

.btn-download:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.form-hint {
  font-size: 13px;
  color: #9e9e9e;
  margin: 0;
}

.instructions {
  background: #f5f5f5;
  border-radius: 14px;
  padding: 24px;
}

.instructions h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #424242;
}

.instructions ol {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.instructions li {
  font-size: 14px;
  color: #424242;
  line-height: 1.6;
}

.instructions code {
  background: #e0e0e0;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 13px;
}
</style>
