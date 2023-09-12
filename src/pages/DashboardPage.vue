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
  <div v-if="slug === 'cod'">
    <div class="grid">
      <div
        v-for="(team, index) in teams"
        :key="index"
        class="col-12 md:col-6 lg:col mt-2"
      >
        <TeamCard :teamObj="team" />
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

const statsStore = useStatsStore()
const gameModeStore = useGameModeStore()
const userStore = useUserStore()
const teamStore = useTeamStore()
const timeLineData = computed(() => {
  return statsStore.timeLine
})
const seasonStats = computed(() => {
  return statsStore.seasonStats
})
const { playerStats, teams } = storeToRefs(statsStore)
const { slug } = storeToRefs(gameModeStore)

gameModeStore.$subscribe(() => {
  statsStore.loadStats()
})

onBeforeMount(async () => {
  await teamStore.loadTeams()
  if (userStore.users.length !== 0) return
  await userStore.loadUsers()
  if (gameModeStore.modeList.length) return
  await gameModeStore.loadGameModes()
})
</script>

<style scoped></style>
