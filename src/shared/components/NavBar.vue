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
  dialogVisible.value = true;
}

</script>

<style scoped>
</style>