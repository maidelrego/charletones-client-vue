export interface Team {
  _id: string
  name: string,
  avatar: string,
}

export interface RocketLeagueStats {
  win: Team,
  createdAt?: string,
  participants: Team[]
}
