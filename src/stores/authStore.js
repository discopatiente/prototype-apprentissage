import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // Promise résolue dès que le widget a fini de s'initialiser
  // (il vérifie si l'utilisateur a une session active)
  let resolveReady
  const readyPromise = new Promise((resolve) => {
    resolveReady = resolve
  })

  function init() {
    if (!window.netlifyIdentity) {
      resolveReady()
      return
    }
    window.netlifyIdentity.on('init', (u) => {
      user.value = u
      resolveReady()
    })
    window.netlifyIdentity.on('login', (u) => {
      user.value = u
      window.netlifyIdentity.close()
    })
    window.netlifyIdentity.on('logout', () => {
      user.value = null
    })
    window.netlifyIdentity.init()
  }

  function login() {
    window.netlifyIdentity?.open()
  }

  function logout() {
    window.netlifyIdentity?.logout()
  }

  return { user, readyPromise, init, login, logout }
})
