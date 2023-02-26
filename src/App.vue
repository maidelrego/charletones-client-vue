<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import ToolBar from '@/shared/components/ToolBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <ToolBar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
