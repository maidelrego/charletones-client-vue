<template>
  <div class="grid">
    <div v-for="(player, index) in playerStats" :key="player.user.fullName" class="col-12 md:col-6 lg:col mt-2">
      <UserCard :playerStat="player" :index="index" />
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-6 lg:col-4">
      <GameModeWinnerTable :stats-data="winnersData" />
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <!-- <GameModeWinnerTable /> -->
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <!-- <GameModeWinnerTable /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStatsStore } from "@/stores/stats";
import { useGameModeStore } from "@/stores/gameMode";
import { onBeforeMount, computed } from 'vue';
import { storeToRefs } from 'pinia';
import UserCard from "@/components/UserCard.vue";
import GameModeWinnerTable from "@/components/GameModeWinnerTable.vue";

const statsStore = useStatsStore();
const gameModeStore = useGameModeStore();
const winnersData = computed(() => statsStore.stats.filter((stat) => stat.win));
const { playerStats } = storeToRefs(statsStore)


gameModeStore.$subscribe(() => {
  statsStore.loadStats();
});

onBeforeMount(async () => {
  await gameModeStore.loadGameModes();
  gameModeStore.setSelectedDefault();
})
</script>

<style scoped></style>
