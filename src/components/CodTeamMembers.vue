<template>
  <div class="grid">
    <div v-for="member in membersProp" :key="member._id" class="col-12 md:col-4 text-center mb-5">
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
                individualStats.filter((i) => i.user === member._id)[0]?.kdRatio.toFixed(2) || 0
              }}</span>
            </div>
            <div class="surface-300 w-full mt-2" style="height: 7px; border-radius: 4px">
              <div
                :class="
                  getKdColor(
                    individualStats.filter((i) => i.user === member._id)[0]?.kdRatio.toFixed(2)
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

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { IndividualStats } from '@/interfaces/Cod'
import Badge from 'primevue/badge'
import Avatar from 'primevue/avatar'
import { useCodStatsStore } from '@/stores/codStats';

interface Members {
    _id: string
    fullName: string
    avatar: string
    roles: string[]
  }[]

const props = defineProps<{
  membersProp: Members[]
}>()

const { membersProp } = toRefs(props)

const codStats = useCodStatsStore()

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

<style scoped>
/* .names {
  font-size: 1.2rem;
  font-weight: 200;
  color: #fff;
  font-family: 'Cubano', sans-serif;
} */

.memberCard {
  background-color: #1d1e24;
  border-radius: 10px;
}
</style>
