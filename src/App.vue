<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/cubano');
.main {
  background: rgb(31,40,52);
  background: linear-gradient(0deg, rgba(31,40,52,1) 66%, rgba(18,24,27,1) 100%);
  margin: 0;
  padding: 0;
  height: 98.3vh;
}
h1 {
  color: #fff;
  font-family: 'Cubano', sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
}
</style>
