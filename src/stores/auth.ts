import { doAPIGet, doAPIPost } from '@/services/api';
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User';
import router from '@/router';

interface AuthState {
  loggedIn: boolean,
  token: string,
  _id: string,
  user: User
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    loggedIn: false,
    token: '',
    _id: '',
    user: {} as User,
  } as AuthState ),

  getters: {
    isLoggedIn: (state) => state.loggedIn
  },
  actions: {
    initUser (user: User) {
      this.user = user
    },
    async loadFromLocalStorage() {
      const authUser = localStorage.getItem('charletonesUser')
      if (authUser) {
        const checkAuthUser = await doAPIGet("auth/checkAuth");
        if (checkAuthUser.statusCode === 401) {
          localStorage.removeItem("charletonesUser");
        } else {
          this.loggedIn = true;
          this.token = checkAuthUser.token;
          this._id = checkAuthUser._id;
        }
      }
    },
    async login(email: string, password: string) {
      const login = await doAPIPost("auth/login", { email, password });
      if (login.status === 201) {
        this.loggedIn = true;
        this.token = login.data.token;
        this._id = login.data._id;
        localStorage.setItem('charletonesUser', JSON.stringify(login.data));
      } else {
        // TODO: Handle error
      }
    },
    async logout() {
      this.loggedIn = false;
      this.token = '';
      localStorage.removeItem('charletonesUser');
      router.push({ name: 'login' });
    }
  }
})