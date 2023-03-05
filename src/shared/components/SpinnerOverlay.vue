<template>
  <div v-if="blockedScreen" class="progress-spinner">
    <ProgressSpinner strokeWidth="4" />
  </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watchEffect } from 'vue';

const blockedScreen = ref(false);

watchEffect(() => {
  if (props.blocked) {
    blockedScreen.value = true;
  } else {
    blockedScreen.value = false;
  }
});

const props = defineProps<{
  blocked: boolean;
}>();

</script>

<style scoped>
</style>