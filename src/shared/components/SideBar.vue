<template>
    <div class="mainBar">
      <SideBarIcon icon="home" to='/dashboard' tootltip="Dashboard" />
      <SideBarIcon icon="plus" to='/create' tootltip="Insert Stat" />
      <SideBarIcon icon="dice" to='/room' tootltip="Room" />
      <SideBarIcon icon="gear" to='/settings' tootltip="Settings" />
    </div>
</template>

<script setup lang="ts">
import SideBarIcon from './SideBarIcon.vue';


</script>

<style scoped>
.mainBar {
  position: fixed;
  top: 0px;
  left: 0;
  height: 100vh;
  width: 5rem;
  margin: 0;
  flex-direction: column;
  background-color: #1e1f22;
  color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>