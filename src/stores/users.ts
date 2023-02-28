import type { User } from '@/interfaces/User'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'

interface UserState {
  users: User[]
}

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      users: []
    } as UserState),
  getters: {
    getUsers: (state) => state.users
  },
  actions: {
    async loadUsers() {
      try {
        const usersList = await doAPIGet('auth/users')
        this.users = usersList
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    }
  }
})
