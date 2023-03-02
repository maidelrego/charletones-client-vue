import type { Stats, PlayerStat } from '@/interfaces/Stats'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useGameModeStore } from './gameMode'
import { countPlayerShooterStats } from '@/utils/helpers'

const gameMode = useGameModeStore()

interface StatsState {
  stats: Stats[],
  playerStats: PlayerStat[]
}

export const useStatsStore = defineStore('statsStore', {
  state: () =>
    ({
      stats: [],
      playerStats: []
    } as StatsState),
  getters: {
    getWinners: (state) => state.stats.filter((stat) => stat.win)
  },
  actions: {
    async loadStats() {
      if (!gameMode.selectedGameMode) return
      try {
        const stats = await doAPIGet('games/by-mode/' + gameMode.selectedGameMode)
        console.log('STATS', stats)
        const playerStats = countPlayerShooterStats(stats, gameMode.slug)
        if (gameMode.slug === 'dominoes') {
          playerStats.sort((a, b) => {
            if (a.totalWin > b.totalWin) return -1
            if (a.totalWin < b.totalWin) return 1
            if (a.totalWin === b.totalWin) {
              if (a.totalLose > b.totalLose) return 1
              if (a.totalLose < b.totalLose) return -1
            }
            return 0
          })
        }
        console.log('PLAYER STATS', playerStats)
        this.stats = stats
        this.playerStats = playerStats
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
