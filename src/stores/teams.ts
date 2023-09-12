import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useSpinnerStore } from '@/stores/spinner';

const spinnerStore = useSpinnerStore();

interface Team {
  _id: string
  name: string,
  avatar: string,
}

interface TeamState {
  teams: Team[]
}

export const useTeamStore = defineStore('teamStore', {
  state: () =>
    ({
      teams: []
    } as TeamState),
  actions: {
    async loadTeams() {
      try {
        spinnerStore.setLoadingState(true)
        const teams = await doAPIGet('teams')
        this.teams = teams
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
  }
})
