<template>
  <div>
    <h1>Room Page</h1>
    <p>Server Status: {{ serverStatus }}</p>
    <ul>
      <li v-for="client in clientsList" :key="client">
        {{ client }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { connectToServer } from '@/utils/socket-client'
  import { useSocketStore } from "@/stores/socket"
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';

  const socketStore = useSocketStore()
  const { serverStatus, clientsList } = storeToRefs(socketStore)
  
  onMounted(() => {
    console.log('mounted')
    connectToServer()
  })




</script>

<style scoped></style>