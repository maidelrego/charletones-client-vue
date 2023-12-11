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
              <font-awesome-icon icon="circle-dot" style="color: #2196f3" />
            </template>
            <template #opposite="slotProps">
              <span class="spanText">{{
                moment(slotProps.item.createdAt).format('MM/DD/YYYY hh:mm A')
              }}</span>
            </template>
            <template #content="slotProps">
              <div class="flex align-items-center">
                <Avatar
                  :image="slotProps.item.win.avatar"
                  shape="circle"
                  v-tooltip.bottom="slotProps.item.win.name"
                  style="height: 45px; width: 45px"
                />
                <span class="mr-3 ml-3">Defeated</span>
                <Avatar
                  :image="getOpponent(slotProps.item.participants, slotProps.item.win._id)?.avatar"
                  shape="circle"
                  v-tooltip.bottom="
                    getOpponent(slotProps.item.participants, slotProps.item.win._id)?.name
                  "
                  style="height: 45px; width: 45px"
                />
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
import Avatar from 'primevue/avatar'
import moment from 'moment'
import Timeline from 'primevue/timeline'
import type { RocketLeagueStats, Team } from '@/interfaces/RocketLeague'

const props = defineProps<{
  statsData: RocketLeagueStats[]
}>()

const getOpponent = (data: Team[], winner: string) => {
  return data.find((t) => t._id !== winner)
}
</script>

<style scoped>
</style>
