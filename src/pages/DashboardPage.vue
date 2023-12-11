<template>
  <div v-if="slug === 'dominoes'">
    <div class="grid">
      <div
        v-for="(player, index) in playerStats"
        :key="player.user.fullName"
        class="col-12 md:col-6 lg:col mt-2"
      >
        <UserCard :playerStat="player" :index="index" />
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12 lg:col-6">
        <TimeLine v-if="playerStats.length > 0" :stats-data="timeLineData" />
      </div>
      <div class="col-12 md:col-12 lg:col-6">
        <SeasonsFieldset v-if="playerStats.length > 0" :stats-data="seasonStats" />
      </div>
    </div>
  </div>
  <div v-if="slug === 'cod' || slug === 'rocket_league'">
    <div class="grid">
      <div
        v-for="(team, index) in teams"
        :key="index"
        class="col-12 md:col-6 lg:col mt-2"
      >
        <TeamCard :teamObj="team" />
      </div>
    </div>
    <div class="grid" v-if="slug === 'cod'">
      <div class="col-12 md:col-12 lg:col-6">
        <CodTimeline v-if="codTimelineData.length > 0" :stats-data="codTimelineData" />
      </div>
    </div>
    <div class="grid" v-if="slug === 'rocket_league'">
      <div class="col-12 md:col-12 lg:col-12">
        <RocketLeagueTimeline v-if="rocketLeagueStatsData.length > 0" :stats-data="rocketLeagueStatsData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStatsStore } from '@/stores/stats'
import { useGameModeStore } from '@/stores/gameMode'
import { useUserStore } from '@/stores/users'
import { onBeforeMount, computed } from 'vue'
import { storeToRefs } from 'pinia'
import UserCard from '@/components/UserCard.vue'
import TimeLine from '@/components/TimelineComp.vue'
import SeasonsFieldset from '@/components/SeasonsFieldset.vue'
import TeamCard from '@/components/TeamCard.vue'
import { useTeamStore } from '@/stores/teams'
import { useCodStatsStore } from '../stores/codStats';
import CodTimeline from '@/components/CodTimeline.vue'
import { useRocketLeagueStatsStore } from '../stores/rocketLeagueStats';
import RocketLeagueTimeline from '@/components/RocketLeagueTimeline.vue'

const codStats = useCodStatsStore()
const statsStore = useStatsStore()
const gameModeStore = useGameModeStore()
const userStore = useUserStore()
const teamStore = useTeamStore()
const rocketLeagueStats = useRocketLeagueStatsStore()

const timeLineData = computed(() => {
  return statsStore.timeLine
})

const codTimelineData = computed(() => {
  return codStats.timeLine
})

const rocketLeagueStatsData = computed(() => {
  return rocketLeagueStats.stats
})

const seasonStats = computed(() => {
  return statsStore.seasonStats
})
const { playerStats } = storeToRefs(statsStore)
const { slug } = storeToRefs(gameModeStore)
const { teams } = storeToRefs(teamStore)

gameModeStore.$subscribe(() => {
  switch (gameModeStore.slug) {
    case 'dominoes':
      statsStore.loadStats()
      break
    case 'cod':
      teamStore.loadTeams()
      codStats.loadCodStats()
      break
    case 'rocket_league':
      teamStore.loadTeams()
      rocketLeagueStats.loadRocketLeagueStats()

  }
})

onBeforeMount(async () => {
  if (userStore.users.length !== 0) return
  await userStore.loadUsers()
  if (gameModeStore.modeList.length) return
  await gameModeStore.loadGameModes()
})
</script>

<style scoped></style>
