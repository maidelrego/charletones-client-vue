<template>
  <div class="centerDiv">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <img :src="logo3" alt="Image" height="200" class="mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back Charle!</div>
      </div>

      <div>
        <form @submit.prevent="login">
          <div class="mb-4">
              <InputText placeholder="Email" id="email1" type="text" v-model="email" class="w-full mb-2" :class="emailInvalid" />
              <span class="text-red-600" v-if="emailInvalid">Must be valid Email</span>
          </div>

          <div class="mb-4">
            <InputText placeholder="Password" type="password" v-model="password" class="w-full mb-2" :class="passwordInvalid" />
            <span class="text-red-600" v-if="passwordInvalid">Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number.</span>
          </div>

          <Button type="submit" label="Sign In" icon="pi pi-user" class="w-full"></Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import logo3 from '@/assets/images/logo3.png';
import { onBeforeMount, computed } from 'vue';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { ref } from 'vue';


const email = ref<string>('');
const password = ref<string>('');

onBeforeMount(async () => {
  const authStore = useAuthStore();
  await authStore.loadFromLocalStorage();

  if (authStore.isLoggedIn) {
    router.replace({ name: 'mainLayout' });
  }
});

const login = async () => {
  const authStore = useAuthStore();
  await authStore.login(email.value, password.value);

  if (authStore.isLoggedIn) {
    router.push({ name: 'mainLayout' });
  }
};

const emailInvalid = computed(() => {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(email.value) && email.value.length > 0 ? '' : 'p-invalid';
});

const passwordInvalid = computed(() => {
  return /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password.value) ? '' : 'p-invalid';
});

</script>

<style scoped>
.centerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98.3vh;
}
</style>