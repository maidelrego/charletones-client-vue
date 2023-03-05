<template>
  <Dialog :content-style="[{ backgroundColor: '#2a2e35' }]" :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }" v-model:visible="value">
    <template #header>
      <div class="cardHeader">
        <span class="tableHeader">Insert Stats</span>
      </div>
    </template>
    <InsertStats @close-dialog="closeDialog" />
  </Dialog>
</template>

<script setup lang="ts">
import InsertStats from '@/components/InsertStats.vue';
import Dialog from 'primevue/dialog';
import { computed } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  }
});

const closeDialog = () => {
  value.value = false;
}

</script>

<style scoped>
</style>