<template>
  <div class="home">
    <h1 class="titre">Bonjour !</h1>
    <p class="description">Prête pour la leçon du jour ?</p>

    <button class="btn-start" @click="start">Commencer</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function start() {
  router.push('/lesson/lesson-animaux-01')
}
</script>

<style scoped>
.home {
  max-width: 640px;
  margin: 0 auto;
  padding: 64px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.titre {
  font-size: 36px;
  font-weight: 500;
  margin: 0;
}

.description {
  font-size: 18px;
  color: #757575;
  margin: 0;
}

.btn-start {
  margin-top: 16px;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.btn-start:hover {
  background: #1565c0;
}
</style>
