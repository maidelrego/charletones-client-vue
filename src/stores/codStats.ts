import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useSpinnerStore } from '@/stores/spinner';
import type { CodStats, IndividualStats, TimelineInterface } from '@/interfaces/Cod'


const spinnerStore = useSpinnerStore();

interface CodStatsState {
  stats: CodStats[]
  individualStats: IndividualStats[],
  timeLine: TimelineInterface[]
}

export const useCodStatsStore = defineStore('codStats', {
  state: () =>
    ({
      stats: [],
      individualStats: [],
      timeLine: []
    } as CodStatsState),
  actions: {
    async loadCodStats() {
      try {
        spinnerStore.setLoadingState(true)
        const stats = await doAPIGet('cod-games')
        const individual = await doAPIGet('cod-user-stats/all-time-stats')
        const timeline = await doAPIGet('cod-games/timeline')
        this.stats = stats
        this.individualStats = individual
        this.timeLine = timeline
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    }
  }
})
