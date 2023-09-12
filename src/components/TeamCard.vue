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
              <span class="numbers">{{ teamObj.wins || 0 }}</span>
            </div>
            <div class="col">
              <Avatar size="xlarge" style="background-color: #2196f3; color: #ffffff">
                <span class="p-avatar-text p-avatar-text-icon-left">
                  <font-awesome-icon icon="circle-notch" class="icon" />
                </span>
              </Avatar>
              <span class="numbers">{{ teamObj.loses || 0 }}</span>
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
                <Avatar class="-mt-8" :image="member.avatar" shape="circle" style="height: 60px; width: 60px" />
                <span class="block text-900 mb-1 mt-1 text-xl font-bold">{{ member.fullName }}</span>
              </div>
              <div class="flex justify-content-between align-items-center">
                <span class="text-600">Kills</span
                ><span class="text-900 font-medium">50%</span>
              </div>
              <div class="surface-300 mt-2 mb-3 border-round" style="height: 7px">
                <div class="bg-blue-500 h-full border-round w-6"></div>
              </div>
              <div class="flex justify-content-between align-items-center">
                <span class="text-600">Deaths</span
                ><span class="text-900 font-medium">50%</span>
              </div>
              <div class="surface-300 mt-2 mb-3 border-round" style="height: 7px">
                <div class="bg-blue-500 h-full border-round w-6"></div>
              </div>
              <div class="flex justify-content-between align-items-center">
                <span class="text-600">KD</span
                ><span class="text-900 font-medium">50%</span>
              </div>
              <div class="surface-300 mt-2 mb-3 border-round" style="height: 7px">
                <div class="bg-blue-500 h-full border-round w-6"></div>
              </div>
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
import { toRefs } from 'vue'

interface TeamObj {
  _id: string
  name: string
  avatar: string
  wins: number
  loses: number
  members: {
    _id: string
    fullName: string
    avatar: string
  }[]
}

const props = defineProps<{
  teamObj: TeamObj
}>()

const { teamObj } = toRefs(props)

console.log('team', teamObj.value)
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
