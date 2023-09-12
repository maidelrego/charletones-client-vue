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
              <span class="spanText">{{ moment(slotProps.item.date).format('MM/DD/YYYY') }}</span>
            </template>
            <template #content="slotProps">
              <div>
                <div>
                  <h4 class="mt-0 mb-2 spanText">Wins & Game Mode</h4>
                  <Avatar
                    v-for="team in slotProps.item.winners"
                    :key="team.team._id"
                    :image="team.team.avatar"
                    shape="circle"
                    v-tooltip.bottom="team.team.name"
                  />
                </div>
                <div class="mb-4">
                  <Avatar
                    v-for="team in slotProps.item.winners"
                    :key="team.team._id"
                    :label="translateModes(team.mode).shortName"
                    shape="circle"
                    style="background-color:#2196F3; cursor: pointer;"
                    v-tooltip.bottom="translateModes(team.mode).name"
                  />
                </div>
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
import type {  TimelineInterface } from '@/interfaces/Cod'
import Timeline from 'primevue/timeline'
import Avatar from 'primevue/avatar'
import moment from 'moment'
import { ref } from 'vue';

const props = defineProps<{
  statsData: TimelineInterface[]
}>()

const codModes = ref([
  { name: 'Team Deathmatch', code: 1, shortName: 'TD' },
  { name: 'Search & Destroy', code: 2, shortName: 'SD' },
  { name: 'Domination', code: 3, shortName: 'D' },
  { name: 'Hardpoint', code: 4, shortName: 'H' },
  { name: 'Capture the Flag', code: 5, shortName: 'CF' },
  { name: 'Kill Confirmed', code: 6, shortName: 'KC' },
  { name: 'Control', code: 7, shortName: 'C' }
])

const translateModes = (key: number) => {
  return codModes.value.filter((mode) => mode.code === key)[0]
}

</script>

<style scoped></style>
