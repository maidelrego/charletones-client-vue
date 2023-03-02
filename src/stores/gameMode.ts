import type { GameMode } from '@/interfaces/GameMode'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'

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
   
  },
  actions: {
    async loadGameModes() {
      try {
        const gameModes = await doAPIGet('modes')
        console.log('GAME MODES', gameModes)
        this.modeList = gameModes
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
