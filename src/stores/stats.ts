import type { Stats, PlayerStat, SeasonStats } from '@/interfaces/Stats'
import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useGameModeStore } from './gameMode'
import { countPlayerShooterStats, seasonPartitions, sortByWins } from '@/utils/helpers'
import { useSpinnerStore } from '@/stores/spinner'

const spinnerStore = useSpinnerStore()

const gameMode = useGameModeStore()

interface StatsState {
  stats: Stats[]
  playerStats: PlayerStat[]
  seasonStats: SeasonStats[]
  timeLine: any
}

export const useStatsStore = defineStore('statsStore', {
  state: () =>
    ({
      stats: [],
      playerStats: [],
      seasonStats: [],
      timeLine: []
    } as StatsState),
  getters: {
    getWinners: (state) => state.stats.filter((stat) => stat.win)
  },
  actions: {
    async loadStats() {
      spinnerStore.setLoadingState(true)
      if (!gameMode.selectedGameMode) return
      try {
        const stats = await doAPIGet('games/by-mode/' + gameMode.selectedGameMode)
        const timeLine = await doAPIGet('games/by-date/' + gameMode.selectedGameMode)
        const mostWinsInADay = await doAPIGet('games/user-most-wins')
        const mostLosesInADay = await doAPIGet('games/user-most-loses')
        const playerStats = countPlayerShooterStats(stats, gameMode.slug)
        const seasonPartitionsData = seasonPartitions(stats, gameMode.slug)

        if (gameMode.slug === 'dominoes') {
          sortByWins(playerStats)
        }

        if (mostWinsInADay) {
          playerStats.forEach((playerStat) => {
            if (playerStat.playerId === mostWinsInADay.user) {
              playerStat.mostWinsInADay = mostWinsInADay.wins
            } else {
              playerStat.mostWinsInADay = null
            }
          })
        }

        if (mostLosesInADay) {
          playerStats.forEach((playerStat) => {
            if (playerStat.playerId === mostLosesInADay.user) {
              playerStat.mostLosesInADay = mostLosesInADay.argoya
            } else {
              playerStat.mostLosesInADay = null
            }
          })
        }

        this.stats = stats
        this.playerStats = playerStats
        this.timeLine = timeLine
        this.seasonStats = seasonPartitionsData
        spinnerStore.setLoadingState(false)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
  }
})
