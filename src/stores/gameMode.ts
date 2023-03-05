import type { GameMode } from '@/interfaces/GameMode'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useSpinnerStore } from '@/stores/spinner';

const spinnerStore = useSpinnerStore();

interface GameModeState {
  modeList: GameMode[],
  selectedGameMode: string,
  slug: string | undefined
}

export const useGameModeStore = defineStore('gameModeStore', {
  state: () =>
    ({
      modeList: [],
      selectedGameMode: '',
      slug: ''
    } as GameModeState),
  getters: {
   getSelectedGameMode: (state) => {  
      return state.selectedGameMode
    }
  },
  actions: {
    async loadGameModes() {
      try {
        spinnerStore.setLoadingState(true)
        const gameModes = await doAPIGet('modes')
        this.modeList = gameModes
        this.setSelectedDefault()
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
    setSlug() {
      this.slug = this.modeList.find((mode) => mode._id === this.selectedGameMode)?.slug
    },
    setSelectedDefault() {
      this.selectedGameMode = this.modeList[0]._id
      this.slug = this.modeList[0].slug
    }
  }
})
