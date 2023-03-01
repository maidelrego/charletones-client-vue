<template>
  <div class="grid">
    <div class="col md:col-4 lg:col-4">
      <NavBar />
    </div>
    <div class="col-12 md:col-4 lg:col-4 text-center">
      <Dropdown class="mt-2" style="background-color: transparent; min-width: 230px;" v-model="selectedCity"
        :options="cities" optionLabel="name" option-value="id" placeholder="Game Mode">
        <template #value="slotProps">
          <div class="mySelectStyles" v-if="!slotProps.value">
            <span>{{ slotProps.placeholder }}</span>
          </div>
          <div v-else>
            <span class="mySelectStyles">{{ cities.filter(i => i.id === slotProps.value)[0].name }}</span>
          </div>
        </template>
        <template #option="slotProps">
          <div>
            <span class="myOptions">{{ slotProps.option.name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="col-12 md:col-4 lg:col-4 text-right pr-3 mt-2">
      <Avatar :image="user[0] ? user[0].avatar : ''" shape="circle" size="large"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import NavBar from './NavBar.vue';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)

const selectedCity = ref(null);

const cities = [
  { name: 'Dominoes', id: 1 },
  { name: 'COD', id: 2 },
  { name: 'Apex Legends', id: 3 }
];
</script>

<style scoped>
.mySelectStyles {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: sophia-prop, sans-serif;
}

.myOptions {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: sophia-prop, sans-serif;
}
</style>