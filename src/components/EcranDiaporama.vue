<template>
  <div class="ecran">
    <div v-if="ecran.frise" class="frise">
      <template v-for="(mot, index) in ecran.frise.mots" :key="mot">
        <span class="mot" :class="{ gras: ecran.frise.gras }">{{ mot }}</span>
        <span v-if="index < ecran.frise.mots.length - 1" class="connecteur">
          <span class="connecteur-ligne"></span>
          <span class="connecteur-fleche">➜</span>
        </span>
      </template>
    </div>

    <template v-if="ecran.type === 'intro'">
      <h1 class="intro-titre">{{ ecran.titre }}</h1>
      <img class="intro-image" :src="'/images/' + ecran.image" :alt="ecran.titre" />
    </template>

    <template v-else-if="ecran.type === 'split'">
      <div class="split">
        <div class="colonne">
          <p v-if="ecran.gauche.texte" class="colonne-texte">
            <span
              v-for="(partie, index) in ecran.gauche.texte"
              :key="index"
              :class="partie.surligne ? 'surligne' : 'texte-simple'"
            >{{ partie.t }}</span>
          </p>
          <div class="colonne-remplissage"></div>
          <img class="colonne-image" :src="'/images/' + ecran.gauche.image" alt="" />
        </div>

        <div class="separateur"></div>

        <div class="colonne">
          <p v-if="ecran.droite.texte" class="colonne-texte">
            <span
              v-for="(partie, index) in ecran.droite.texte"
              :key="index"
              :class="partie.surligne ? 'surligne' : 'texte-simple'"
            >{{ partie.t }}</span>
          </p>
          <div class="colonne-remplissage"></div>
          <img class="colonne-image" :src="'/images/' + ecran.droite.image" alt="" />
        </div>
      </div>
    </template>

    <template v-else-if="ecran.type === 'recap'">
      <div class="recap">
        <div v-for="carte in ecran.cartes" :key="carte.label" class="carte">
          <p class="carte-label">{{ carte.label }}</p>
          <p class="carte-phrase">{{ carte.phrase }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div v-if="groupes.length" class="visuel">
        <div v-for="(groupe, index) in groupes" :key="index" class="groupe">
          {{ groupe }}
        </div>
      </div>

      <p class="texte">{{ ecran.texte }}</p>
    </template>
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
  align-items: stretch;
  text-align: center;
}

.frise {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex-wrap: wrap;
}

.mot {
  font-size: 15px;
  font-weight: 600;
  color: #4A352B;
}

.mot.gras {
  font-weight: 800;
  font-size: 16px;
}

.connecteur {
  display: inline-flex;
  align-items: center;
  margin: 0 6px;
}

.connecteur-ligne {
  width: 16px;
  border-top: 2px dashed #D8BFA4;
  display: inline-block;
  margin-right: 3px;
}

.connecteur-fleche {
  color: #C2855F;
  font-weight: 800;
  font-size: 14px;
}

.intro-titre {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #4A352B;
  line-height: 1.3;
}

.intro-image {
  width: 100%;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
  background: #EFE3D2;
}

.split {
  display: flex;
  gap: 14px;
  align-items: stretch;
}

.colonne {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.colonne-texte {
  margin: 0 0 10px;
}

.texte-simple {
  font-size: 17px;
  font-weight: 600;
  color: #4A352B;
  line-height: 1.5;
}

.surligne {
  font-size: 17px;
  font-weight: 800;
  color: #4A352B;
  background: #FBD9B8;
  padding: 2px 6px;
  border-radius: 8px;
  line-height: 1.5;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.colonne-remplissage {
  flex: 1;
}

.colonne-image {
  width: 100%;
  height: 130px;
  border-radius: 16px;
  object-fit: cover;
  background: #EFE3D2;
}

.separateur {
  width: 1.5px;
  background: #E3D5C4;
  align-self: stretch;
}

.recap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.carte {
  background: #FFFDFB;
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: 0 10px 22px -16px rgba(74, 53, 43, 0.3);
}

.carte-label {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 800;
  color: #C2855F;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.carte-phrase {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #4A352B;
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
