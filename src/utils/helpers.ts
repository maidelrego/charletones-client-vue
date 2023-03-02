import type { Stats, PlayerStat } from '@/interfaces/Stats'
// import { ProcessEnv } from "env";
import * as _ from 'lodash'
// const partitionSize = ProcessEnv.REACT_APP_PARTITION_SIZE

// export const getBiggerValue = (data: Stats[], propertyValue) => {
//   const maxValueObject = data.reduce((prev, current) =>
//     prev[propertyValue] > current[propertyValue] ? prev : current
//   );

//   return maxValueObject;
// };

// export const seasonPartitions = (numbers, slug = "dominoes") => {
//   let seasons = [];
//   const size = partitionSize * 4; // number of games per 4 rows on data for each player
//   let seasonSize = size;
//   let partitions = [];

//   for (let i = 0; i < numbers.length; i += seasonSize) {
//     partitions.push(numbers.slice(i, i + seasonSize));
//   }

//   partitions.forEach((partition, index) => {
//     const seasonStat = countPlayerShooterStats(partition, slug);
//     const season = {
//       seasonName: `Season ${index + 1}`,
//       seasonStats: seasonStat,
//       winner: getBiggerValue(seasonStat, "totalWin"),
//       loser: getBiggerValue(seasonStat, "totalLose"),
//       remainingGames: (seasonSize - partition.length) / 4,
//     };
//     seasons.push(season);
//   });

//   return seasons;
// };



export const tableAugmentData = (data: Stats[]) => {
  data = data.map((row) => {
    return {
      ...row,
      createdAt: new Date(row.createdAt).toDateString(),
      player: row.user.fullName
    }
  })
  return data
}

function getRatio(stat: PlayerStat, slug: string | undefined) {
  let ratio
  if (slug !== 'dominoes') {
    ratio = stat.totalKills / stat.totalDeaths
  } else {
    if (stat.totalWin >= 1 && stat.totalLose >= 1 && stat.gotNothing >= 1) {
      ratio = stat.totalWin / stat.totalLose / stat.gotNothing
    } else {
      ratio = 0
    }
  }
  return ratio
}

function getWinPercentage(win: number, totalGames: number) {
  return (win / totalGames) * 100
}

function getLostPercentege(lose: number, totalGames: number) {
  return (lose / totalGames) * 100
}

function getGotNothingPercentege(gotNothing: number, totalGames: number) {
  return (gotNothing / totalGames) * 100
}

export const countPlayerShooterStats = (data: Stats[], slug: string | undefined) => {
  const statsData = []

  const sortedData = _.groupBy(data, 'user.fullName')

  for (const value of Object.values(sortedData)) {
    const playerStat = <PlayerStat>{
      totalKills: 0,
      totalLose: 0,
      totalWin: 0,
      totalDeaths: 0,
      playerId: '',
      gameModeId: '',
      ratio: 0,
      winPercentage: 0,
      lostPercentege: 0,
      gotNothing: 0,
      gotNothingPercentege: 0,
      user: value[0].user
    }
    value.forEach((stat) => {
      playerStat.totalKills += stat.kills
      playerStat.totalLose += slug === 'dominoes' ? (stat.argoya ? 1 : 0) : stat.win ? 0 : 1
      playerStat.totalWin += stat.win ? 1 : 0
      playerStat.totalDeaths += stat.deaths
      playerStat.playerId = stat.user._id
      playerStat.gameModeId = stat.mode
      playerStat.gotNothing += !stat.win && !stat.argoya ? 1 : 0
    })

    playerStat.gotNothingPercentege = getGotNothingPercentege(
      playerStat.gotNothing,
      value.length
    )

    playerStat.ratio = getRatio(playerStat, slug)

    playerStat.winPercentage = getWinPercentage(playerStat.totalWin, value.length)

    playerStat.lostPercentege = getLostPercentege(playerStat.totalLose, value.length)

    // if (slug !== 'dominoes') {
    //   delete playerStat.gotNothing
    //   delete playerStat.gotNothingPercentege
    // }

    statsData.push(playerStat)
  }
  return statsData
}

export const sortingRanking = (a: PlayerStat, b: PlayerStat) => {
  // Compare by totalWin first
  if (a.totalWin < b.totalWin) {
    return 1
  }
  if (a.totalWin > b.totalWin) {
    return -1
  }
  // If totalWin are equal, compare by totalLose
  if (a.totalLose < b.totalLose) {
    return -1
  }
  if (a.totalLose > b.totalLose) {
    return 1
  }
}
