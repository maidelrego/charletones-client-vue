import { defineStore } from 'pinia'

interface SpinnerState {
  loading: boolean
}

export const useSpinnerStore = defineStore('spinnerStore', {
  state: () =>
    ({
      loading: false,
    } as SpinnerState),
  getters: {
    loadingState(state: SpinnerState) {
      return state.loading
    },
  },
  actions: {
    setLoadingState(loading: boolean) {
      this.loading = loading
    }
  }
})
