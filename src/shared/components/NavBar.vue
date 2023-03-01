<template>
  <div class="navBar">
    <router-link class="links" v-for="link in links" :key="link.name" :to="link.path">
      {{ link.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = ref([
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Create', path: '/create' },
  { name: 'Rooms', path: '/room' },
  { name: 'Settings', path: '/settings' }
]);
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