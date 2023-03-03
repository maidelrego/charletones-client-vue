import type { Stats, PlayerStat } from '@/interfaces/Stats'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useGameModeStore } from './gameMode'
import { countPlayerShooterStats } from '@/utils/helpers'

const gameMode = useGameModeStore()

interface StatsState {
  stats: Stats[],
  playerStats: PlayerStat[],
  timeLine: any
}


export const useStatsStore = defineStore('statsStore', {
  state: () =>
    ({
      stats: [],
      playerStats: [],
      timeLine: []
    } as StatsState),
  getters: {
    getWinners: (state) => state.stats.filter((stat) => stat.win)
  },
  actions: {
    async loadStats() {
      if (!gameMode.selectedGameMode) return
      try {
        const stats = await doAPIGet('games/by-mode/' + gameMode.selectedGameMode)
        const timeLine = await doAPIGet('games/by-date/' + gameMode.selectedGameMode)
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
        this.stats = stats
        this.playerStats = playerStats
        this.timeLine = timeLine
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
  }
})
