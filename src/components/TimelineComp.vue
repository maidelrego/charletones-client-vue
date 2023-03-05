<template>
  <div>
    <Card class="shadow-5 statsCard border-round-50">
      <template #header>
        <div class="cardHeader">
          <span class="tableHeader">Timeline</span>
        </div>
      </template>
      <template #content>
        <div class="scroll">
          <Timeline :value="props.statsData">
            <template #marker>
              <font-awesome-icon icon="circle-dot" style="margin-top: 5px; color: #2196f3;" />
            </template>
            <template #opposite="slotProps">
              <span class="spanText">{{ slotProps.item.date }}</span>
            </template>
            <template #content="slotProps">
              <div>
                <h4 class="mt-1 mb-2 spanText">Wins</h4>
                <AvatarGroup class="mb-3">
                  <Avatar v-for="player in slotProps.item.wins" :key="player._id" :image="player.user.avatar"
                    shape="circle" />
                </AvatarGroup>
                <template v-if="slotProps.item.losses.length > 0">
                  <h4 class="mt-1 mb-2 spanText">Donuts</h4>
                  <AvatarGroup class="mb-3">
                    <Avatar v-for="player in slotProps.item.losses" :key="player._id" :image="player.user.avatar"
                      shape="circle" />
                  </AvatarGroup>
                </template>
              </div>

            </template>
          </Timeline>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import type { Stats } from '../interfaces/Stats';
import Timeline from 'primevue/timeline';
import AvatarGroup from 'primevue/avatargroup';
import Avatar from 'primevue/avatar';


const props = defineProps<{
  statsData: Stats[]
}>()


</script>

<style scoped>
</style>