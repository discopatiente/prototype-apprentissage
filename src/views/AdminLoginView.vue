<template>
  <div class="login">
    <div class="login-card">
      <h1 class="titre">Espace admin</h1>
      <p class="sous-titre">Connexion réservée à l'administrateur</p>
      <button class="btn-login" @click="authStore.login()">Se connecter</button>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

watch(
  () => authStore.user,
  (u) => {
    if (u) router.push('/admin')
  },
)
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 380px;
}

.titre {
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.sous-titre {
  font-size: 14px;
  color: #757575;
  margin: 0;
  text-align: center;
}

.btn-login {
  margin-top: 8px;
  padding: 14px 40px;
  font-size: 16px;
  font-weight: 500;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
}

.btn-login:hover {
  background: #1565c0;
}
</style>
