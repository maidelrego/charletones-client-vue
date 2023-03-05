<template>
  <div>
    <Card class="shadow-5 statsCard border-round-50">
      <template #header>
        <div class="cardHeader">
          <span class="tableHeader">Season Stats</span>
        </div>
      </template>
      <template #content>
        <div>
          <Fieldset class="mt-2" v-for="stat of props.statsData" :key="stat.seasonName"
            :legend="legendTitle(stat.seasonName, stat.remainingGames)" :toggleable="true"
            :collapsed="stat.remainingGames > 0 ? false : true">
            <ol>
              <li v-for="season of stat.seasonStats" :key="season._id">
                <span class="spanText">{{ season.user.fullName }}</span>
                <span class="spanText">( {{ season.totalWin }} - {{ season.totalLose }} )</span>
              </li>
            </ol>
          </Fieldset>
        </div>
      </template>
    </Card>

  </div>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card'

const props = defineProps<{
  statsData: any
}>()

const legendTitle = (seasonName: string, remainingGames: number) => {
  if (remainingGames > 0) {
    return `${seasonName} (${remainingGames} remaining games)`
  } else {
    return `${seasonName}`
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.p-fieldset) {
  background-color: #2a2e35;
}
::v-deep(.p-fieldset-legend) {
  background-color: #2a2e35;
}
::v-deep(.p-fieldset-content) {
  background-color: #2a2e35;
  padding: 0;
}
</style>