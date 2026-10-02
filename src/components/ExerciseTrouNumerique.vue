<template>
  <div class="exercice">
    <div v-if="exercise.contexte" class="text-box">
      <p class="text-content">{{ exercise.contexte }}</p>
    </div>

    <p v-if="exercise.consigne" class="consigne">{{ exercise.consigne }}</p>

    <div v-if="hasIllustrationSimple || hasIllustrationDouble" class="illustration">
      <div v-if="hasIllustrationSimple" class="groupe groupe--neutre">
        <img
          v-for="n in exercise.carresDepart"
          :key="`depart-${n}`"
          src="/images/maths/carre.png"
          alt="carré de chocolat"
          class="carre"
        />
      </div>
      <template v-if="hasIllustrationDouble">
        <div class="groupe groupe--vert">
          <img
            v-for="n in exercise.carresRestants"
            :key="`reste-${n}`"
            src="/images/maths/carre.png"
            alt="carré de chocolat"
            class="carre"
          />
        </div>
        <div class="groupe groupe--rouge">
          <img
            v-for="n in exercise.carresDonnes"
            :key="`donne-${n}`"
            src="/images/maths/carre.png"
            alt="carré de chocolat"
            class="carre"
          />
        </div>
      </template>
    </div>

    <ImageRow v-if="exercise.images" :images="exercise.images" />

    <div class="phrase-card">
      <span class="phrase-texte">{{ exercise.avant }}</span>
      <input
        v-model="userInput"
        class="answer-input"
        :class="{
          'input--correct':   answerSubmitted && isCorrect,
          'input--incorrect': answerSubmitted && !isCorrect,
        }"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="3"
        :disabled="answerSubmitted"
        @input="onInput"
        @keydown.enter="valider"
      />
      <span class="phrase-texte">{{ exercise.apres }}</span>
    </div>

    <p v-if="answerSubmitted && !isCorrect" class="correction">
      Bonne réponse : <strong>{{ exercise.reponse }}</strong>
    </p>

    <button
      v-if="!answerSubmitted"
      class="btn-valider"
      :disabled="userInput === ''"
      :style="{ opacity: userInput === '' ? 0.45 : 1 }"
      @click="valider"
    >
      Valider
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageRow from './ImageRow.vue'

const props = defineProps({
  exercise: { type: Object, required: true },
})

const emit = defineEmits(['answer-submitted'])

const userInput = ref('')
const answerSubmitted = ref(false)
const isCorrect = ref(false)

const hasIllustrationSimple = computed(() => typeof props.exercise.carresDepart === 'number')
const hasIllustrationDouble = computed(() => typeof props.exercise.carresRestants === 'number')

function onInput(e) {
  userInput.value = e.target.value.replace(/[^0-9]/g, '')
}

function valider() {
  if (userInput.value === '' || answerSubmitted.value) return
  isCorrect.value = parseInt(userInput.value, 10) === props.exercise.reponse
  answerSubmitted.value = true
  emit('answer-submitted', {
    id: props.exercise.id,
    isCorrect: isCorrect.value,
    points: props.exercise.points,
  })
}
</script>

<style scoped>
.exercice {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.text-box {
  background: #FBF1E2;
  border-left: 4px solid #E0A48F;
  border-radius: 0 14px 14px 0;
  padding: 14px 18px;
}

.text-content {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  color: #5C4A3D;
  margin: 0;
}

.consigne {
  font-size: 24px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.35;
  text-align: center;
  margin: 0;
}

.illustration {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.groupe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 18px;
  padding: 14px 18px;
  max-width: 100%;
  box-shadow: 0 10px 22px -16px rgba(74, 53, 43, 0.35);
}

.carre {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.groupe--neutre {
  background: #FFFDFB;
  border: 2px solid #EFE3D2;
}

.groupe--vert {
  background: #E9F0E2;
  border: 2px solid #A9C29A;
}

.groupe--rouge {
  background: #FBE3DC;
  border: 2px solid #E0A290;
}

.phrase-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #FFFDFB;
  border: 2px solid #EFE3D2;
  border-radius: 18px;
  padding: 20px 18px;
  box-shadow: 0 10px 22px -16px rgba(74, 53, 43, 0.35);
}

.phrase-texte {
  font-size: 22px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.3;
}

.answer-input {
  width: 64px;
  height: 52px;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  border: 2px solid #EFE3D2;
  border-radius: 14px;
  background: #FAF5EF;
  color: #4A352B;
  outline: none;
  transition: border-color 0.2s;
}

.answer-input:focus { border-color: #C2855F; }
.answer-input:disabled { cursor: default; }

.input--correct {
  border-color: #A9C29A !important;
  background: #E9F0E2 !important;
  color: #5E7A52 !important;
}

.input--incorrect {
  border-color: #E0A290 !important;
  background: #FBE3DC !important;
  color: #B25B45 !important;
}

.correction {
  font-size: 15px;
  font-weight: 700;
  color: #B25B45;
  text-align: center;
  margin: 0;
}

.btn-valider {
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 30px;
  background: #EFA88C;
  color: #4A352B;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 22px -12px rgba(216, 138, 108, 0.7);
}

.btn-valider:not(:disabled):active { transform: scale(0.98); }
</style>
