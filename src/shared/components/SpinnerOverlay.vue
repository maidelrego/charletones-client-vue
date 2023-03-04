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

<style lang="scss" scoped>
.progress-spinner {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.progress-spinner:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.53);
}
</style>