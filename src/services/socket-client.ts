// server localhost:3000/socket.io/socket.io.js

import { Manager, Socket } from "socket.io-client"
import { useSocketStore } from "@/stores/socket"

const socketStore = useSocketStore()

export const connectToServer = () => {
  const manager = new Manager('localhost:3000/socket.io/socket.io.js')
  
  const socket = manager.socket('/')

  addListeners(socket)
}


const addListeners = (socket: Socket) => {
  socket.on('connect', () => {
    console.log('CONNECTED')
    socketStore.setServerStatus('ONLINE')
  })

  socket.on('disconnect', () => {
    console.log('DISCONNECTED')
    socketStore.setServerStatus('OFFLINE')
  })

  socket.on('clients-updated', (clients: string[]) => {
    console.log('CLIENTS UPDATED', clients)
    socketStore.setClientsList(clients)
  })
  
}