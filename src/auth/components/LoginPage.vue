<template>
  <div class="centerDiv">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <h1 class="text-800 text-3xl">Welcome Back!</h1>
        <h1 class="text-6xl">Charleton</h1>
      </div>

      <div>
        <Toast position="top-right" />
        <form @submit.prevent="login">
          <div class="mb-4">
            <InputText placeholder="Email" id="email1" type="text" v-model="form.email" class="w-full mb-2" />
            <span class="text-red-600" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
          </div>

          <div class="mb-4">
            <InputText placeholder="Password" type="password" v-model="form.password" class="w-full mb-2" />
            <span class="text-red-600" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
          </div>

          <Button type="submit" label="Sign In" icon="pi pi-user" class="w-full"></Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onBeforeMount, computed, reactive } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useAuthStore } from '@/stores/auth'
import { useSpinnerStore } from '@/stores/spinner';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const toast = useToast();
const authStore = useAuthStore();
const spinnerStore = useSpinnerStore();

const passwordValidation = (value: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(value);
};

const form = reactive({
  email: '',
  password: ''
})

const rules = computed(() => ({
  email: {
    required,
    email
  },
  password: {
    required,
    passwordValidation: helpers.withMessage('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number.', passwordValidation)
  }
}))

const v$ = useVuelidate(rules, form)

onBeforeMount(async () => {
  await authStore.loadFromLocalStorage();

  if (authStore.isLoggedIn) {
    router.replace({ name: 'mainLayout' });
  }
});

const login = async () => {
  v$.value.$validate()
  if (v$.value.$invalid) return;
  spinnerStore.setLoadingState(true)
  authStore.login(form).then((res) => {
    if (res.status === 201) {
      authStore.setCredentials(res.data.token, res.data._id);
      router.push({ name: 'mainLayout' });
      spinnerStore.setLoadingState(false)
    } else {
      spinnerStore.setLoadingState(false)
      toast.add({ severity: 'error', summary: 'Error', detail: res.message, life: 6000 });
    }
  })
};

</script>

<style scoped>
.centerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98.3vh;
}

::v-deep(.p-button) {
  background-color: #2084f3;
}

::v-deep(.p-button-label) {
  color: #fff;
  font-family: sophia, sans-serif;
  font-weight: 700;
  font-size: 1rem;
}

::v-deep(.p-inputtext) {
  background-color: transparent;
  font-size: 1rem;
  height: 3rem;
}
</style>