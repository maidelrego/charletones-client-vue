<template>
  <div class="navBar">
    <router-link class="links" to="/dashboard">Dashboard</router-link>
    <span @click="openCreateDialog()" class="links" :class="dialogVisible">Create</span>
    <router-link class="links" to="/room">Rooms</router-link>
    <router-link class="links" to="/settings">Settings</router-link>
    <CreatePage v-model:modelValue="dialogVisible" />
  </div>
</template>

<script setup lang="ts">
import CreatePage from '@/pages/CreatePage.vue';
import { ref } from 'vue';

const dialogVisible = ref(false);

const openCreateDialog = () => {
  console.log('openCreateDialog');
  dialogVisible.value = true;
}

</script>

<style scoped>
.navBar {
  overflow: hidden;
  display: flex;
}

.links {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 1.25rem;
  margin-top: 1.5rem;
  font-weight: 700;
  font-family: sophia-prop, sans-serif;
}

.links:hover {
  color: #2196F3;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  scale: 1.1;
  cursor: pointer;
}

.active {
  color: #2196F3;
}</style>