import type { Stats } from '@/interfaces/Stats'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'

interface StatsState {
  stats: Stats[]
}

export const useStatsStore = defineStore('statsStore', {
  state: () =>
    ({
      stats: []
    } as StatsState),
  getters: {
    getWinners: (state) => state.stats.filter((stat) => stat.win)
  },
  actions: {
    async loadStats() {
      try {
        const stats = await doAPIGet('games/by-mode/63c1bf2eb897aef63a63089b')
        console.log('STATS', stats)
        this.stats = stats
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
    // async loadStatsByPlayer(playerId: string) {
    //   if (this.stats.length === 0) {
    //     await this.loadStats()
    //   }
    //   const playerStats = this.stats.filter((stat) => stat.user._id === playerId)
    //   return pla
    // }
  }
})
