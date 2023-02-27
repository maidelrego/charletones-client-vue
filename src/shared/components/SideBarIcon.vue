<template>
  <div class="sidebar-icon group">
    <RouterLink :to="props.to">
      <font-awesome-icon :icon="props.icon" class="icon" />
      <span class="sidebar-tooltip">{{ tootltip }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps<{
  icon: string;
  to: string;
  tootltip: string;
}>();

</script>

<style scoped>
.sidebar-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 3.5rem;
  width: 3.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-right: auto;
  margin-left: auto;
  background-color: #313338;
  border-radius: 2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: rgb(34 197 94);
}
.sidebar-icon:hover {
  border-radius: 0.3rem;
  background-color: rgb(34 197 94);
  border-radius: 20px;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  cursor: pointer;
}
.icon {
  height: 2.3rem;
  width: 2.3rem;
  color: #3ba55c;
}
.icon:hover {
  color: white;
}
.sidebar-tooltip {
  position: absolute;
  width: auto;
  padding: 0.5rem;
  margin: 0.5rem;
  min-width: max-content;
  left: 4.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  color: white;
  background-color: rgb(17 24 39);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  transition-property: all;
  transition-duration: 0.3;
  transform: scale(0);
  transform-origin: left;
}
.group:hover .sidebar-tooltip {
  transform: scale(1);
}
/* .sidebar-icon:active {
  color: white;
  border-radius: 10px;
  background-color: #e3f2fd;
} */

</style>