<template>
  <div class="grid">
    <div v-for="(player, index) in playerStats" :key="player.user.fullName" class="col-12 md:col-6 lg:col mt-2">
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
</template>

<script setup lang="ts">
import { useStatsStore } from "@/stores/stats";
import { useGameModeStore } from "@/stores/gameMode";
import { onBeforeMount, computed } from 'vue';
import { storeToRefs } from 'pinia';
import UserCard from "@/components/UserCard.vue";
import TimeLine from "@/components/TimelineComp.vue";
import SeasonsFieldset from "@/components/SeasonsFieldset.vue";

const statsStore = useStatsStore();
const gameModeStore = useGameModeStore();
const timeLineData = computed(() => { return statsStore.timeLine });
const seasonStats = computed(() => { return statsStore.seasonStats });
const { playerStats } = storeToRefs(statsStore)


gameModeStore.$subscribe(() => {
  statsStore.loadStats();
});

onBeforeMount(async () => {
  if (gameModeStore.modeList.length) return
  await gameModeStore.loadGameModes();
})
</script>

<style scoped></style>
