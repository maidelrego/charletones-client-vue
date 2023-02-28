<template>
  <div class="grid">
    <div v-for="user of users" :key="user.fullName" class="col mr-2">
      <UserCard :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "@/stores/users";
  import { onBeforeMount } from 'vue';
  import { storeToRefs } from 'pinia';
  import UserCard from "@/components/UserCard.vue";

  const userStore = useUserStore();
  const { users } = storeToRefs(userStore);
  
  onBeforeMount (async () => {
    await userStore.loadUsers();
  })
</script>

<style scoped>

</style>
