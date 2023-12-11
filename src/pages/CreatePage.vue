<template>
  <Dialog :content-style="[{ backgroundColor: '#2a2e35' }]" :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '70vw' }" v-model:visible="value">
    <template #header>
      <div class="cardHeader">
        <span class="tableHeader">Insert Stats</span>
      </div>
    </template>
    <InsertStats v-if="slug === 'dominoes'" @close-dialog="closeDialog" />
    <InserStatsCod v-if="slug === 'cod'" @close-dialog="closeDialog" />
    <InsertRocketLeagueStats v-if="slug === 'rocket_league'" @close-dialog="closeDialog" />
  </Dialog>
</template>

<script setup lang="ts">
import InsertStats from '@/components/InsertStats.vue';
import Dialog from 'primevue/dialog';
import { computed } from 'vue';
import { useGameModeStore } from '@/stores/gameMode';
import InserStatsCod from '@/components/InsertStatsCod.vue';
import { storeToRefs } from 'pinia';
import InsertRocketLeagueStats from '@/components/InsertRocketLeagueStats.vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const gameMode = useGameModeStore()
const { slug } = storeToRefs(gameMode)

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