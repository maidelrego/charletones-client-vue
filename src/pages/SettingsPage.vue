<template>
  <div class="grid">
    <div class="col-12">
      <h1 class="text-6xl text-center">Settings</h1>
    </div>
    <div class="text-center col">
      <div>
        <Avatar class="mt-3" :image="avatar" shape="circle" style="height: 130px; width: 130px" />
        <Inplace :closable="true" closeIcon="pi pi-check" class="mt-4" @close="updateProfile">
          <template #display>
            {{ username || 'Click to Edit' }}
          </template>
          <template #content>
            <InputText v-model="username" autoFocus class="mr-2" />
          </template>
        </Inplace>
      </div>
      <div class="mt-5">
        <FileUpload
          :customUpload="true"
          @uploader="(e) => uploadAvatar(e)"
          accept="image/*"
          :maxFileSize="1000000"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
    </div>
    <div class="text-center col" v-if="user.roles.includes('capi')">
      <div>
        <Avatar class="mt-3" :image="teamAvatar" shape="circle" style="height: 130px; width: 130px" />
        <Inplace :closable="true" closeIcon="pi pi-check" class="mt-4" @close="updateTeamProfile">
          <template #display>
            {{ teamName || 'Click to Edit' }}
          </template>
          <template #content>
            <InputText v-model="teamName" autoFocus class="mr-2" />
          </template>
        </Inplace>
      </div>
      <div class="mt-5">
        <FileUpload
          :customUpload="true"
          @uploader="(e) => uploadTeamAvatar(e)"
          accept="image/*"
          :maxFileSize="1000000"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useStatsStore } from '@/stores/stats'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import Inplace from 'primevue/inplace'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import { doAPIPost, doAPIPut } from '@/services/api'
import { useTeamStore } from '@/stores/teams'

const toast = useToast()
const authStore = useAuthStore()
const teamStore = useTeamStore()
const statsStore = useStatsStore()
const { user } = storeToRefs(authStore)
const username = ref<string>(user.value.fullName)
const userId = ref<string>(user.value._id)
const avatar = computed(() => {
  return user.value.avatar
  ? user.value.avatar
  : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
})

const teamAvatar = computed(() => {
  return teamStore.myTeam?.avatar
  ? teamStore.myTeam?.avatar
  : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
})

const myTeam = computed(() => {
  return teamStore.myTeam ? teamStore.myTeam : { name: 'No Team', _id: '' }
})

const teamName = ref<string>(myTeam.value.name)

authStore.$subscribe(() => {
  statsStore.loadStats()
})

const updateProfile = async () => {
  const newForm = new FormData()
  newForm.append('fullName', username.value)
  const updatedUser = await doAPIPost(`auth/update/${userId.value}`, newForm)
  authStore.initUser(updatedUser.data)
}

const updateTeamProfile = async () => {
  if (!myTeam.value._id) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error uploading', life: 3000 })
    return
  }
  const updatedTeam = await doAPIPut(`teams/${myTeam.value._id}`, { name: teamName.value })
  teamStore.initMyTeam(updatedTeam.data)
}

const uploadAvatar = async (e: any) => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
  const newForm = new FormData()
  newForm.append('image', e.files[0])
  const updatedUser = await doAPIPost(`auth/update/${userId.value}`, newForm)
  authStore.initUser(updatedUser.data)
}

const uploadTeamAvatar = async (e: any) => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
  const newForm = new FormData()
  newForm.append('image', e.files[0])
  if (!myTeam.value._id) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error uploading', life: 3000 })
    return
  }
  const updatedTeam = await doAPIPut(`teams/${myTeam.value._id}`, newForm)
  teamStore.initMyTeam(updatedTeam.data)
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
