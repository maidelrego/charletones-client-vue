<template>
  <div class="grid">
    <div class="col-12 md:col-12 lg:col-4">
      <img :src="logo" alt="logo" style="width: 350px;" />
    </div>
    <div class="col-12 md:col-12 lg:col-4">
      <Dropdown class="mr-4" style="border-radius: 20px;" v-model="selectedCity" :options="cities"
        optionLabel="name" option-value="id" placeholder="Select a City" />
      <Button label="Insert" icon="pi pi-plus" iconPos="right" class="p-button-md p-button-raised p-button-rounded" />
    </div>
    <div class="col-12 md:col-12 lg:col-4 md:text-center lg:text-right">
      <Button class="p-button-md p-button-raised p-button-rounded">
        <i class="pi pi-cog" style="font-size: 1.4rem"></i>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
import logo from '@/assets/images/logo4.png'
import Button from 'primevue/button';

const selectedCity = ref(null);

const cities = [
  { name: 'Dominoes', id: 1 },
  { name: 'COD', id: 2 },
  { name: 'Apex Legends', id: 3 }
];
</script>

<style scoped>
</style>