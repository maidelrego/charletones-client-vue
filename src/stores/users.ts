import type { User } from '@/interfaces/User'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface UserState {
  users: User[]
}

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      users: []
    } as UserState),
  getters: {
    getLoggedUser: (state) => {
      const authUser = useAuthStore()
      const loggedUser = state.users.filter((user) => user._id === authUser._id)
      return loggedUser
    }
  },
  actions: {
    async loadUsers() {
      try {
        const usersList = await doAPIGet('auth/users')
        this.users = usersList
        this.setUser(this.getLoggedUser)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
    setUser(user: User[]) {
      const authUser = useAuthStore()
      authUser.user = user
    }
  }
})
