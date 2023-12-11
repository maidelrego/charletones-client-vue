<template>
  <div>
    <Card class="shadow-5 cardBackground border-round-md">
      <template #header>
        <div class="cardHeader">
          <Avatar
            class="mt-3"
            :image="teamObj.avatar"
            shape="circle"
            style="height: 130px; width: 130px"
          />
          <h1 class="mt-0 mb-0">{{ teamObj.name }}</h1>
        </div>
      </template>
      <template #content>
        <div>
          <CodCard :teamObj="teamObj" v-if="slug === 'cod'" />
          <RocketLeagueCard :teamObj="teamObj" v-if="slug === 'rocket_league'" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import { toRefs } from 'vue'
import { useGameModeStore } from '../stores/gameMode'
import { storeToRefs } from 'pinia'
import CodCard from './CodCard.vue'
import RocketLeagueCard from './RocketLeagueCard.vue'

interface TeamObj {
  _id: string
  name: string
  avatar: string
  members: {
    _id: string
    fullName: string
    avatar: string
    roles: string[]
  }[]
}

const props = defineProps<{
  teamObj: TeamObj
}>()

const { teamObj } = toRefs(props)
const gameMode = useGameModeStore()
const { slug } = storeToRefs(gameMode)
</script>

<style lang="scss" scoped>
::v-deep(.p-card-content) {
  padding: 0;
}

.cardHeader {
  background-color: #1d1e24;
  text-align: center;
  padding-bottom: 1rem;
}

.cardBackground {
  position: relative;
  background-color: #2a2e35;
}
</style>
