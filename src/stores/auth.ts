import { doAPIGet, doAPIPost } from '@/services/api'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'
import router from '@/router'

interface AuthState {
  loggedIn: boolean
  token: string
  _id: string
  user: User
}

export const useAuthStore = defineStore('authStore', {
  state: () =>
    ({
      loggedIn: false,
      token: '',
      _id: '',
      user: {} as User
    } as AuthState),

  getters: {
    isLoggedIn: (state) => state.loggedIn
  },
  actions: {
    initUser(user: User) {
      this.user = user
    },
    setCredentials(token: string, _id: string) {
      this.token = token
      this._id = _id
      this.loggedIn = true
      localStorage.setItem('charletonesUser', JSON.stringify({ token, _id }))
    },
    async loadFromLocalStorage() {
      const authUser = localStorage.getItem('charletonesUser')
      if (authUser) {
        const checkAuthUser = await doAPIGet('auth/checkAuth')
        if (checkAuthUser.statusCode === 401) {
          localStorage.removeItem('charletonesUser')
        } else {
          this.setCredentials(checkAuthUser.token, checkAuthUser._id)
        }
      }
    },
    async login(email: string, password: string) {
      try {
        const login = await doAPIPost('auth/login', { email, password })
        return login
      } catch (error) {
        console.log('ERROR', error)
      }
    },
    async logout() {
      this.loggedIn = false
      this.token = ''
      localStorage.removeItem('charletonesUser')
      router.push({ name: 'login' })
    }
  }
})
