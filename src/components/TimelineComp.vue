<template>
  <div>
    <Card class="shadow-5 winnersTableCard border-round-50">
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
.spanText {
  font-size: 1rem;
  color: white;
  font-family: sophia, sans-serif;
  font-weight: 400;
}

.cardHeader {
  background-color: #eab308;
  text-align: center;
}

.winnersTableCard {
  background-color: #2a2e35;
}

.tableHeader {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-text-opacity: 1;
  color: rgb(18 24 27 / var(--tw-text-opacity));
  font-size: 1.5rem;
  line-height: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity));
  color: #1f2834;
  display: inline-block;
  font-family: 'Cubano', sans-serif;
}

div.scroll {
  height: 438px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>