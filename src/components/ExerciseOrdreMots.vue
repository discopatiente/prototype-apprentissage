<template>
  <div class="exercice">
    <p class="consigne">
      {{ exercise.consigne || 'Touche les étiquettes dans le bon ordre pour reconstruire la phrase.' }}
    </p>

    <ImageRow v-if="exercise.images" :images="exercise.images" />

    <!-- La phrase en construction : mots déjà placés, puis cases vides -->
    <div
      class="phrase-card"
      :class="{
        'phrase--correct':   answerSubmitted && isCorrect,
        'phrase--incorrect': answerSubmitted && !isCorrect,
      }"
    >
      <button
        v-for="(tileIndex, position) in placedTiles"
        :key="`place-${tileIndex}`"
        class="mot-place"
        :disabled="answerSubmitted"
        @click="removeTile(position)"
      >
        {{ tiles[tileIndex] }}
      </button>
      <span
        v-for="n in tiles.length - placedTiles.length"
        :key="`vide-${n}`"
        class="case-vide"
      ></span>
      <span
        v-if="exercise.ponctuation"
        class="ponctuation"
        :class="{ 'ponctuation--collee': exercise.ponctuation === '.' }"
      >{{ exercise.ponctuation }}</span>
    </div>

    <p v-if="!answerSubmitted && placedTiles.length > 0" class="astuce">
      Touche un mot de la phrase pour le retirer.
    </p>

    <!-- Les étiquettes encore disponibles -->
    <div v-if="!answerSubmitted" class="etiquettes">
      <button
        v-for="tileIndex in availableTiles"
        :key="`etiquette-${tileIndex}`"
        class="etiquette"
        @click="placeTile(tileIndex)"
      >
        {{ tiles[tileIndex] }}
      </button>
    </div>

    <p v-if="answerSubmitted && !isCorrect" class="correction">
      Bonne phrase : <strong>{{ correctSentence }}</strong>
    </p>

    <button
      v-if="!answerSubmitted"
      class="btn-valider"
      :disabled="!allPlaced"
      :style="{ opacity: allPlaced ? 1 : 0.45 }"
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

// Mélange les mots, en recommençant si le hasard redonne la phrase dans l'ordre
function shuffle(words) {
  const allSame = words.every((w) => w === words[0])
  let result = [...words]
  do {
    result = [...words].sort(() => Math.random() - 0.5)
  } while (!allSame && result.join(' ') === words.join(' '))
  return result
}

const tiles = shuffle(props.exercise.mots)

// Indices (dans tiles) des étiquettes placées dans la phrase, dans l'ordre choisi
const placedTiles = ref([])
const answerSubmitted = ref(false)
const isCorrect = ref(false)

const availableTiles = computed(() =>
  tiles.map((_, index) => index).filter((index) => !placedTiles.value.includes(index)),
)

const allPlaced = computed(() => placedTiles.value.length === tiles.length)

// En français, on met une espace avant « ? » et « ! », mais pas avant « . »
const correctSentence = computed(() => {
  const punctuation = props.exercise.ponctuation ?? ''
  const space = punctuation === '?' || punctuation === '!' ? ' ' : ''
  return props.exercise.mots.join(' ') + space + punctuation
})

function placeTile(tileIndex) {
  placedTiles.value.push(tileIndex)
}

function removeTile(position) {
  placedTiles.value.splice(position, 1)
}

function valider() {
  if (!allPlaced.value || answerSubmitted.value) return
  // On compare les mots et non les étiquettes : deux « le » sont interchangeables
  const answer = placedTiles.value.map((index) => tiles[index]).join(' ')
  isCorrect.value = answer === props.exercise.mots.join(' ')
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

.consigne {
  font-size: 20px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.3;
  margin: 0;
}

.phrase-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 72px;
  padding: 14px;
  border: 2px solid #EFE3D2;
  border-radius: 18px;
  background: #FFFDFB;
  transition: border-color 0.2s, background 0.2s;
}

.phrase--correct {
  border-color: #A9C29A;
  background: #E9F0E2;
}

.phrase--incorrect {
  border-color: #E0A290;
  background: #FBE3DC;
}

.mot-place {
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  background: #F6D9C9;
  color: #4A352B;
  font-size: 19px;
  font-weight: 800;
  cursor: pointer;
}

.mot-place:disabled {
  cursor: default;
  background: transparent;
  padding: 2px;
}

.case-vide {
  width: 48px;
  height: 44px;
  border: 2px dashed #E3D3BE;
  border-radius: 12px;
}

.ponctuation {
  font-size: 22px;
  font-weight: 800;
  color: #4A352B;
}

/* Le point se colle au dernier mot ; « ? » et « ! » gardent leur espace */
.ponctuation--collee { margin-left: -8px; }

.astuce {
  font-size: 13px;
  font-weight: 600;
  color: #A2937F;
  text-align: center;
  margin: -8px 0 0;
}

.etiquettes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.etiquette {
  border: 2px solid #E8B79F;
  border-radius: 14px;
  padding: 12px 18px;
  background: #FFFDFB;
  color: #4A352B;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 12px -8px rgba(216, 138, 108, 0.7);
}

.etiquette:active,
.mot-place:not(:disabled):active { transform: scale(0.95); }

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
