<template>
    <div class="grid">
      <div v-for="member in membersProp" :key="member._id" class="col-12 md:col-6 text-center">
        <div class="shadow-2 memberCard border-round p-4 flex-1 text-center mb-6 md:mb-0 mt-5">
          <div class="mb-4">
            <Avatar
              class="-mt-8"
              :image="member.avatar"
              shape="circle"
              style="height: 60px; width: 60px"
            />
            <span
              class="block text-900 mb-1 mt-1 text-xl font-bold flex justify-content-center align-items-center"
              >{{ member.fullName
              }}<Badge
                v-if="member.roles.includes('capi')"
                class="ml-2"
                value="C"
                severity="success"
              ></Badge
            ></span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { toRefs } from 'vue'
  import Badge from 'primevue/badge'
  import Avatar from 'primevue/avatar'
  
  interface Members {
      _id: string
      fullName: string
      avatar: string
      roles: string[]
    }[]
  
  const props = defineProps<{
    membersProp: Members[]
  }>()
  
  const { membersProp } = toRefs(props)
  
  </script>
  
  <style scoped>
  .memberCard {
    background-color: #1d1e24;
    border-radius: 10px;
  }
  </style>
  