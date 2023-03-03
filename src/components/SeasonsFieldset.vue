<template>
  <div>
    <Card class="shadow-5 winnersTableCard border-round-50">
      <template #header>
        <div class="cardHeader">
          <span class="tableHeader">Season Stats</span>
        </div>
      </template>
      <template #content>
        <div class="scroll">
          <Fieldset v-for="stat of props.statsData" :key="stat.seasonName"
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

// const legendTitle = (seasonName: string, remainingGames: number) => {
//   return `${seasonName} (${remainingGames} remaining games)`
// }

const legendTitle = (seasonName: string, remainingGames: number) => {
  if (remainingGames > 0) {
    return `${seasonName} (${remainingGames} remaining games)`
  } else {
    return `${seasonName}`
  }
}
</script>

<style lang="scss" scoped>
.spanText {
  color: #fff;
  font-family: sofia-pro, sans-serif;
  font-weight: 800;
}

li {
  margin-bottom: .5rem;
}

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
</style>