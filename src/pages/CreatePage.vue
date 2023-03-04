<template>
  <div>
    <Dialog :content-style="[{ backgroundColor: '#2a2e35' }]" :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '50vw' }" v-model:visible="display">
      <template #header>
        <div class="cardHeader">
          <span class="tableHeader">Insert Stats</span>
        </div>
      </template>
      <InsertStats />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import InsertStats from '@/components/InsertStats.vue';
import Dialog from 'primevue/dialog';
import { ref, onBeforeMount } from 'vue';

const display = ref(false);

const showDialog = () => {
  display.value = true;
}

const hideDialog = () => {
  display.value = false;
}

onBeforeMount(() => {
  showDialog();
})
</script>

<style lang="scss" scoped>
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