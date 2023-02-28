import { doAPIGet, doAPIPost } from '@/utils/api';
import { defineStore } from 'pinia'

interface AuthState {
  loggedIn: boolean,
  token: string,
  user: string[]
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    loggedIn: false,
    token: '',
    user: []
  } as AuthState ),

  getters: {
    isLoggedIn: (state) => state.loggedIn
  },
  actions: {
    async loadFromLocalStorage() {
      const authUser = localStorage.getItem('charletonesUser')
      if (authUser) {
        const checkAuthUser = await doAPIGet("auth/checkAuth");
        if (checkAuthUser.statusCode === 401) {
          localStorage.removeItem("charletonesUser");
        } else {
          this.loggedIn = true;
          this.token = checkAuthUser.token;
        }
      }
    },
    async login(email: string, password: string) {
      const login = await doAPIPost("auth/login", { email, password });
      if (login.status === 201) {
        this.loggedIn = true;
        this.token = login.token;
        localStorage.setItem('charletonesUser', JSON.stringify(login.data));
      } else {
        // TODO: Handle error
      }
    },
    async logout() {
      this.loggedIn = false;
      this.token = '';
      localStorage.removeItem('charletonesUser');
    }
  }
})