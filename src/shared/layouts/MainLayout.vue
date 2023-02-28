
<template>
  <div>
    <div class="grid">
      <div class="col-fixed" style="width:80px">
        <SideBar />
      </div>
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import SideBar from '@/shared/components/SideBar.vue'

</script>

<style scoped>
/* .mainView {
  background-color: #e3f2fd;
  overflow: auto;
  margin: 10px;
  border-radius: 10px;
} */
</style>