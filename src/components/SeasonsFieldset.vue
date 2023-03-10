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
            <table id="seasonsStats">
              <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Losses</th>
              </tr>
              <tr v-for="(season, index) in stat.seasonStats" :key="season._id">
                <td class="tagName"><span class="mr-2">{{ index + 1 }}.</span>{{ season.user.fullName }}</td>
                <td><span class="tag">{{ season.totalWin }}</span></td>
                <td><span class="tag">{{ season.totalLose }}</span></td>
              </tr>
            </table>
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
    return `${seasonName}  ( ${remainingGames} remaining games )`
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

#seasonsStats {
  font-family: sophia, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#seasonsStats td, #seasonsStats th {
  padding: 8px;
  text-align: start;
}

#seasonsStats th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: start;
  color: white;
  font-size: 1.1rem;
}

.tag {
  background-color: #2084f3;
  color: white;
  font-size: .9rem;
  border-radius: 2rem;
  padding: 0.2rem 0.5rem;
}

.tagName {
  color: white;
  font-size: .9rem;
  font-family: 'Cubano';
  font-weight: 100;
}
</style>