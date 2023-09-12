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
        <div class="mt-0 pt-0 pl-2">
          <div class="grid mt-3 text-center">
            <div class="col">
              <Avatar size="xlarge" style="background-color: #2196f3; color: #ffffff">
                <span class="p-avatar-text p-avatar-text-icon-left">
                  <font-awesome-icon icon="trophy" class="icon" />
                </span>
              </Avatar>
              <span class="numbers">{{
                teamStats.filter((t) => t.win === teamObj._id).length
              }}</span>
            </div>
          </div>
        </div>
        <div class="myDivider"></div>
        <div>
          <h1 class="text-center">The Team</h1>
        </div>
        <div class="grid">
          <div
            v-for="member in teamObj.members"
            :key="member._id"
            class="col-12 md:col-4 text-center mb-5"
          >
            <div class="shadow-2 memberCard border-round p-4 flex-1 text-center mb-6 md:mb-0 mt-5">
              <div class="mb-4">
                <Avatar
                  class="-mt-8"
                  :image="member.avatar"
                  shape="circle"
                  style="height: 60px; width: 60px"
                />
                <span
                  class="block text-900 mb-1 mt-1 text-xl font-bold flex justify-content-center align-items-center"
                  >{{ member.fullName
                  }}<Badge
                    v-if="member.roles.includes('capi')"
                    class="ml-2"
                    value="C"
                    severity="success"
                  ></Badge
                ></span>
              </div>
              <ul class="list-none p-0 m-0">
                <li class="mb-5">
                  <div class="flex justify-content-between align-items-center">
                    <span class="text-900 inline-flex justify-content-between align-items-center"
                      ><span class="font-medium text-900">Kills</span></span
                    ><span class="text-primary font-medium"
                      >{{ individualStats.filter((i) => i.user === member._id)[0]?.totalKills || 0 }} /
                      2000</span
                    >
                  </div>
                  <div class="surface-300 w-full mt-2" style="height: 7px; border-radius: 4px">
                    <div
                      class="bg-primary h-full"
                      :style="{
                        width:
                          updateProgressBar(
                            individualStats.filter((i) => i.user === member._id)[0]
                          ).killsProgress.toFixed(0) + '%'
                      }"
                      style="border-radius: 4px"
                    ></div>
                  </div>
                </li>
                <li class="mb-5">
                  <div class="flex justify-content-between align-items-center">
                    <span class="text-900 inline-flex justify-content-between align-items-center"
                      ><span class="font-medium text-900">Deaths</span></span
                    ><span class="text-red-500 font-medium"
                      >{{ individualStats.filter((i) => i.user === member._id)[0]?.totalDeaths || 0 }} /
                      2000</span
                    >
                  </div>
                  <div class="surface-300 w-full mt-2" style="height: 7px; border-radius: 4px">
                    <div
                      class="bg-red-500 h-full"
                      :style="{
                        width:
                          updateProgressBar(
                            individualStats.filter((i) => i.user === member._id)[0]
                          ).deathsProgress.toFixed(0) + '%'
                      }"
                      style="border-radius: 4px"
                    ></div>
                  </div>
                </li>
                <li>
                  <div class="flex justify-content-between align-items-center">
                    <span class="text-900 inline-flex justify-content-between align-items-center"
                      ><span class="font-medium text-900">KD Ratio</span></span
                    ><span class="text-orange-500 font-medium">{{
                      individualStats.filter((i) => i.user === member._id)[0]?.kdRatio.toFixed(2) ||
                      0
                    }}</span>
                  </div>
                  <div class="surface-300 w-full mt-2" style="height: 7px; border-radius: 4px">
                    <div
                      :class="
                        getKdColor(
                          individualStats
                            .filter((i) => i.user === member._id)[0]
                            ?.kdRatio.toFixed(2)
                        )
                      "
                      class="h-full"
                      style="width: 45%; border-radius: 4px"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import { toRefs, computed } from 'vue'
import { useCodStatsStore } from '../stores/codStats'
import type { IndividualStats } from '@/interfaces/Cod'

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

const codStats = useCodStatsStore()

const teamStats = computed(() => {
  return codStats.stats
})

const individualStats = computed(() => {
  return codStats.individualStats
})

const updateProgressBar = (player: IndividualStats) => {
  let killsProgress = 0
  let deathsProgress = 0
  if (player) {
    killsProgress = (player.totalKills / 2000) * 100
    deathsProgress = (player.totalDeaths / 2000) * 100

    killsProgress = Math.min(killsProgress, 100)
    deathsProgress = Math.min(deathsProgress, 100)
  }

  return { killsProgress, deathsProgress }
}

const getKdColor = (kd: string) => {
  let kdNumber = Number(kd)
  if (kdNumber < 1) {
    return 'bg-red-500'
  } else if (kdNumber >= 1 && kdNumber < 1.5) {
    return 'bg-yellow-500'
  } else if (kdNumber >= 1.5) {
    return 'bg-green-500'
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.p-card-content) {
  padding: 0;
}
.numbers {
  font-size: 3rem;
  font-weight: 200;
  color: #fff;
  font-family: 'Cubano', sans-serif;
  margin-left: 10px;
}

.names {
  font-size: 1.2rem;
  font-weight: 200;
  color: #fff;
  font-family: 'Cubano', sans-serif;
}

.icon {
  height: 3rem;
  width: 3rem;
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

.memberCard {
  background-color: #1d1e24;
  border-radius: 10px;
}
</style>
