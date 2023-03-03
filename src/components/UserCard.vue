<template>
  <div>
    <Card class="shadow-5 cardBackground border-round-md">
      <template #header>
        <div class="cardHeader">
          <Avatar class="iconCorner" :image="renderIcon" size="large" />
          <Avatar class="mt-3" :image="playerStat.user.avatar" shape="circle" style="height: 130px; width: 130px;" />
          <h1 class="mt-0 mb-0">{{ playerStat.user.fullName }}</h1>
        </div>
      </template>
      <template #content>
        <div class="cardContent mt-0">
          <div class="grid  text-center">
            <div class="col">
              <Avatar size="large" style="background-color:#2196F3; color: #ffffff">
                <span class="p-avatar-text p-avatar-text-icon-left">
                  <font-awesome-icon icon="trophy" class="icon" />
                </span>
              </Avatar>
              <span class="numbers">{{ playerStat.totalWin }}</span>
            </div>
            <div class="col">
              <Avatar size="large" style="background-color:#2196F3; color: #ffffff">
                <span class="p-avatar-text p-avatar-text-icon-left">
                  <font-awesome-icon icon="circle-notch" class="icon" />
                </span>
              </Avatar>
              <span class="numbers">{{ playerStat.totalLose }}</span>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar';
import { toRefs, computed } from 'vue';
import type { PlayerStat } from '../interfaces/Stats';
import firstPlace from '@/assets/images/firstPlace.png'
import secondPlace from '@/assets/images/secondPlace.png'
import thirdPlace from '@/assets/images/thirdPlace.png'
import shit from '@/assets/images/shit.png'

const props = defineProps<{
  playerStat: PlayerStat,
  index: number
}>()

const renderIcon = computed(() => {
  let icon = '';
  switch (props.index) {
    case 0:
      icon = firstPlace;
      break;
    case 1:
      icon = secondPlace;
      break;
    case 2:
      icon = thirdPlace;
      break;
    case 3:
      icon = shit
      break;
    default:
      icon = ''
      break;
  }
  return icon
})

const { playerStat } = toRefs(props)
</script>

<style scoped>
.numbers {
  font-size: 2rem;
  font-weight: 200;
  color: #fff;
  font-family: 'Cubano', sans-serif;
  margin-left: 10px;
}

.icon {
  height: 2rem;
  width: 2rem;
}

.cardHeader {
  background-color: #1d1e24;
  text-align: center;
  padding-bottom: 1rem;
}

.cardContent {
  color: #fff;
  font-family: sofia-pro, sans-serif;
}

.iconCorner {
  position: absolute;
  top: -1.25rem;
  left: -1.25rem;
  height: 50px;
  width: 50px;
  z-index: 1;
}

.cardBackground {
  position: relative;
  background-color: #2a2e35;
}
</style>