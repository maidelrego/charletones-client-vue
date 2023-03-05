<template>
  <div class="grid">
    <div class="col md:col-4 lg:col-4">
      <NavBar />
    </div>
    <div class="col-12 md:col-4 lg:col-4 text-center">
      <Dropdown class="mt-2" style="background-color: transparent; min-width: 230px;" v-model="selectedGameMode"
        :options="modeList" optionLabel="name" option-value="_id" placeholder="Game Mode" @change="gameMode.setSlug">
        <template #value="slotProps">
          <div class="mySelectStyles" v-if="!slotProps.value">
            <span>{{ slotProps.placeholder }}</span>
          </div>
          <div v-else>
            <span class="mySelectStyles">{{ modeList.filter(i => i._id === slotProps.value)[0].name }}</span>
          </div>
        </template>
        <template #option="slotProps">
          <div>
            <span class="myOptions">{{ slotProps.option.name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="col-12 md:col-4 lg:col-4 text-right pr-3 mt-2">
      <span @click="logout">
        <font-awesome-icon icon="right-from-bracket" class="logout" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import NavBar from './NavBar.vue';
import { storeToRefs } from 'pinia';
import { useGameModeStore } from '@/stores/gameMode';
import { useAuthStore } from '@/stores/auth';

const gameMode = useGameModeStore()
const authStore = useAuthStore()
const { logout } = authStore
const { selectedGameMode, modeList } = storeToRefs(gameMode)


</script>

<style scoped>
</style>