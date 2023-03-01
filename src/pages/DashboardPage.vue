<template>
  <div class="grid">
    <div v-for="user of users" :key="user.fullName" class="col-12 md:col-6 lg:col mt-2">
      <UserCard :user="user" />
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-6 lg:col-4">
      <GameModeWinnerTable :stats-data="statsData" />
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
import { useUserStore } from "@/stores/users";
import { useStatsStore } from "@/stores/stats";
import { onBeforeMount, computed } from 'vue';
import { storeToRefs } from 'pinia';
import UserCard from "@/components/UserCard.vue";
import GameModeWinnerTable from "@/components/GameModeWinnerTable.vue";

const userStore = useUserStore();
const statsStore = useStatsStore();
const { users } = storeToRefs(userStore);
const statsData = computed(() => statsStore.stats.filter((stat) => stat.win));

onBeforeMount(async () => {
  await userStore.loadUsers();
  await statsStore.loadStats();
})
</script>

<style scoped></style>
