import { defineStore } from 'pinia'

interface SocketState {
  serverStatus: string,
  clientsList: string[]
}

export const useSocketStore = defineStore('socketStore', {
  state: () => ({
    serverStatus: '',
    clientsList: []
  } as SocketState ),
  getters: {
    getServerStatus(state: SocketState) {
      return state.serverStatus
    },
    getClientsList(state: SocketState) {
      return state.clientsList
    }
  },
  actions: {
    setServerStatus( serverStatus: string) {
      this.serverStatus = serverStatus
    },
    setClientsList( clientsList: string[]) {
      this.clientsList = clientsList
    }
  }
})
