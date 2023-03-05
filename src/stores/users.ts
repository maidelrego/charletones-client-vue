import type { User } from '@/interfaces/User'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useSpinnerStore } from '@/stores/spinner';

const spinnerStore = useSpinnerStore();
const authUser = useAuthStore()
const { initUser } = useAuthStore()

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
      const loggedUser = state.users.find((user) => user._id === authUser._id)
      return loggedUser
    }
  },
  actions: {
    async loadUsers() {
      try {
        spinnerStore.setLoadingState(true)
        const usersList = await doAPIGet('auth/users')
        this.users = usersList
        const loggedUser = this.users.filter((user) => user._id === authUser._id)
        initUser(loggedUser[0])
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
  }
})
