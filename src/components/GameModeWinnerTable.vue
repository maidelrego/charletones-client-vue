<template>
  <div>
    <Card class="shadow-5 cardBackground border-round-50">
      <template #header>
        <div class="cardHeader">
          <span class="tableHeader">Dominoes Winners</span>
        </div>
      </template>
      <template #content>
        <div class="content">
          <!-- <DataTable :value="props.statsData" :paginator="true" :rows="10" :paginatorTemplate="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown'
          }" responsiveLayout="scroll" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" class="p-datatable-sm myTable">
            <Column field="createdAt" header="Date">
              <template #body="slotProps">
                <span>{{ new Date(slotProps.data.createdAt).toDateString() }}</span>
              </template>
            </Column>
            <Column field="user.fullName" header="Player"></Column>
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
          </DataTable> -->
          <DataTable
            :value="props.statsData"
            :paginator="true"
            :rows="10"
            class="p-datatable-sm"
            :paginatorTemplate="{
                default: ' PrevPageLink PageLinks NextPageLink'
            }"
            responsiveLayout="scroll"
        >
            <Column field="createdAt" header="Date"></Column>
            <Column field="user.fullName" header="Name"></Column>
        </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Stats } from '../interfaces/Stats';

const props = defineProps<{
  statsData: Stats[]
}>()

</script>

<style scoped>
.cardHeader {
  background-color: #eab308;
  text-align: center;
}

.cardBackground {
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