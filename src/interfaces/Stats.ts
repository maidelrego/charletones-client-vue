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

export interface PlayerStat {
  totalKills: number
  totalLose: number
  totalWin: number
  totalDeaths: number
  playerId: string
  gameModeId: string
  ratio: number
  winPercentage: number
  lostPercentege: number
  gotNothing: number
  gotNothingPercentege: number,
  mostWinsInADay: number | null,
  mostLosesInADay: number | null,
  user: User
}

export interface SeasonStats {
  loser: User,
  winner: User,
  seasonName: string,
  remainingGames: number,
  seasonStats: Stats[],
}
