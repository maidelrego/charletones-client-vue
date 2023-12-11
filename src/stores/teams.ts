import { doAPIGet } from '@/services/api'
import { defineStore } from 'pinia'
import { useSpinnerStore } from '@/stores/spinner';
import { useAuthStore } from '@/stores/auth';
import { useGameModeStore } from './gameMode';

const spinnerStore = useSpinnerStore();
const userStore = useAuthStore()
const gameModeStore = useGameModeStore()

interface Team {
  _id: string
  name: string
  avatar: string
  wins: number
  loses: number
  members: {
    _id: string
    fullName: string
    avatar: string,
    roles: string[]
  }[]
}

interface TeamState {
  teams: Team[],
  myTeam: Team | null
}

export const useTeamStore = defineStore('teamStore', {
  state: () =>
    ({
      teams: [],
      myTeam: null,
    } as TeamState),
  actions: {
    async loadTeams() {
      try {
        spinnerStore.setLoadingState(true)
        const modeId = gameModeStore.selectedGameMode
        const teams = await doAPIGet(`teams/${modeId}`)
        this.teams = teams
        const myTeam = this.teams.find(team => team.members.find(member => member._id === userStore._id))
        this.myTeam = myTeam || null
        spinnerStore.setLoadingState(false)
      } 
      catch (error) {
        console.log('ERRRRORRRR', error)
      }
    },
    initMyTeam(team: Team) {
      this.myTeam = team
    }
  }
})
