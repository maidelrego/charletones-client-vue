<template>
  <div class="mt-0 pt-0 pl-2">
    <div class="grid mt-3 text-center">
      <div class="col">
        <Avatar size="xlarge" style="background-color: #2196f3; color: #ffffff">
          <span class="p-avatar-text p-avatar-text-icon-left">
            <font-awesome-icon icon="trophy" class="icon" />
          </span>
        </Avatar>
        <span class="numbers">{{ teamStats.filter((t) => t.win._id === props.teamId).length }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCodStatsStore } from '@/stores/codStats';
import { computed } from 'vue';
import Avatar from 'primevue/avatar'

const props = defineProps<{
  teamId: string
}>()
const codStats = useCodStatsStore()

const teamStats = computed(() => {
  return codStats.stats
})
</script>

<style scoped>
.numbers {
  font-size: 3rem;
  font-weight: 200;
  color: #fff;
  font-family: 'Cubano', sans-serif;
  margin-left: 10px;
}

.icon {
  height: 3rem;
  width: 3rem;
}

</style>
