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

body {
  background-color: #1f2834;
  height: 99vh;
}

h1 {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
  --tw-gradient-from: #f97316;
  --tw-gradient-to: rgb(249 115 22 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: #eab308;
  background-clip: text;
  color: #0000;
  -webkit-background-clip: text;
  font-family: 'Cubano', sans-serif;
  font-size: 2rem;
  font-weight: 400;

}
</style>
