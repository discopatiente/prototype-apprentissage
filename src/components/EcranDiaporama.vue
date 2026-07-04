<template>
  <div class="ecran">
    <div v-if="groupes.length" class="visuel">
      <div v-for="(groupe, index) in groupes" :key="index" class="groupe">
        {{ groupe }}
      </div>
    </div>

    <p class="texte">{{ ecran.texte }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ecran: { type: Object, required: true },
})

const groupes = computed(() => {
  if (!props.ecran.visuel) return []
  return props.ecran.visuel.split('|').map((groupe) => groupe.trim())
})
</script>

<style scoped>
.ecran {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
}

.visuel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.groupe {
  background: #FFFDFB;
  border: 2px solid #EFE3D2;
  border-radius: 18px;
  padding: 14px 18px;
  font-size: 32px;
  letter-spacing: 6px;
  box-shadow: 0 10px 22px -16px rgba(74, 53, 43, 0.35);
}

.texte {
  font-size: 19px;
  font-weight: 700;
  color: #4A352B;
  line-height: 1.5;
  margin: 0;
}
</style>
