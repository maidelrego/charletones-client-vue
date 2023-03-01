
<template>
  <div>
    <div class="grid">
      <div class="col-12">
        <ToolBar />
      </div>
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import ToolBar from '../components/ToolBar.vue';

</script>

<style scoped>
</style>