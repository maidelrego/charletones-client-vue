<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router'
import SpinnerOverlay from './shared/components/SpinnerOverlay.vue';
import { useSpinnerStore } from './stores/spinner';

const spinnerStore = useSpinnerStore();
const { loading } = storeToRefs(spinnerStore)

</script>

<template>
  <main class="main">
    <SpinnerOverlay :blocked="loading" />
    <RouterView />
  </main>
</template>

<style>
</style>
