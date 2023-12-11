import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useSpinnerStore } from '@/stores/spinner';
import type { RocketLeagueStats } from '@/interfaces/RocketLeague';


const spinnerStore = useSpinnerStore();

interface RocketLeagueState {
  stats: RocketLeagueStats[]
}

export const useRocketLeagueStatsStore = defineStore('rocketLeagueStats', {
  state: () =>
    ({
      stats: [],
      timeLine: []
    } as RocketLeagueState),
  actions: {
    async loadRocketLeagueStats() {
      try {
        spinnerStore.setLoadingState(true)
        const stats = await doAPIGet('rocket-league-games')
        this.stats = stats
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    }
  }
})
