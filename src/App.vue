<script setup lang="ts">
import { RouterView } from 'vue-router'
// import ToolBar from '@/shared/components/ToolBar.vue'
import SideBar from '@/shared/components/SideBar.vue'
</script>

<template>
  <div class="grid">
    <div class="col-fixed" style="width:80px">
      <SideBar />
    </div>
    <div class="col mainView">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.mainView {
  background-color: #e3f2fd;
  overflow: auto;
  margin: 10px;
  border-radius: 10px;
}
</style>
