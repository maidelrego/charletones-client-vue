export interface Participant {
  kills: number | null
  deaths: number | null
  user: string
  userName: string
}

interface Team {
  _id: string
  name: string
}

export interface CodStats {
  win: Team,
  mode: number
  participants: Participant[]
}

export interface IndividualStats {
  user: string,
  totalKills: number,
  totalDeaths: number,
  kdRatio: number,
}

interface Winner {
  mode: number,
  team: {
    _id: string
    name: string
    avatar: string,
  } 
}

export interface TimelineInterface {
  date: string,
  winners: Winner[]
}
