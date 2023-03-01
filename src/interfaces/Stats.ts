import type { User } from './User'

export interface Stats {
  argoya: boolean
  createdAt: string
  deaths: number
  kills: number
  mode: string
  user: User
  updatedAt: string
  _id: string
  win: number,
}
