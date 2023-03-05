<template>
  <div class="text-center">
    <h1 class="text-6xl">Settings</h1>
    <div>
      <Avatar class="mt-3" :image="avatar" shape="circle" style="height: 130px; width: 130px;" />
      <Inplace :closable="true" closeIcon="pi pi-check" class="mt-4" @close="updateProfile">
        <template #display>
          {{ username || 'Click to Edit' }}
        </template>
        <template #content>
          <InputText v-model="username" autoFocus class="mr-2" />
        </template>
      </Inplace>
    </div>
    <div class="col-12 md:col-12 lg:col-6 lg:col-offset-3 mt-5">
      <FileUpload :customUpload="true" @uploader="(e) => uploadAvatar(e)" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useStatsStore } from '@/stores/stats';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import { doAPIPost } from '@/services/api';

const toast = useToast();
const authStore = useAuthStore();
const statsStore = useStatsStore();
const { user } = storeToRefs(authStore);
const username = ref<string>(user.value.fullName);
const userId = ref<string>(user.value._id);
const avatar = computed(() => { return user.value.avatar ? user.value.avatar : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' })

authStore.$subscribe(() => {
  statsStore.loadStats();
});

const updateProfile = async () => {
  const newForm = new FormData();
  newForm.append('fullName', username.value);
  const updatedUser = await doAPIPost(`auth/update/${userId.value}`, newForm)
  authStore.initUser(updatedUser.data);
}


const uploadAvatar = async (e: any) => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  const newForm = new FormData();
  newForm.append('image', e.files[0]);
  const updatedUser = await doAPIPost(`auth/update/${userId.value}`, newForm)
  authStore.initUser(updatedUser.data);
}
</script>

<style lang="scss" scoped>
::v-deep(.p-inplace-display) {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
  --tw-gradient-from: #f97316;
  --tw-gradient-to: rgb(249 115 22 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: #eab308;
  background-clip: text;
  color: #0000;
  -webkit-background-clip: text;
  font-family: 'Cubano', sans-serif;
  font-size: 2rem;
  font-weight: 400;
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
</style>