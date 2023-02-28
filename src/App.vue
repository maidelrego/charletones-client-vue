<script setup lang="ts">
import { RouterView } from 'vue-router'
// import ToolBar from '@/shared/components/ToolBar.vue'
import SideBar from '@/shared/components/SideBar.vue'
import { doAPIGet, doAPIPost } from '@/utils/api'

const loginData = {
  email: 'maesabroso@gmail.com',
  password: 'Oddun077'
}

const getUsers = () => {
  doAPIGet("auth/users").then((res) => {
    console.log('users', res)
  })
}

const auth = () => {
  doAPIGet("auth/checkAuth").then((res) => {
    if (res.status === 200) {
      getUsers()
    } else {
      doAPIPost("auth/login", loginData).then((res) => {
        if (res.status === 201) {
          localStorage.setItem("charletonesUser", JSON.stringify(res.data));
          getUsers()
        }
      });
    }
  })
}

auth()
</script>

<template>
  <div class="grid">
    <div class="col-fixed" style="width:80px">
      <SideBar />
    </div>
    <div class="col mainView">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.mainView {
  background-color: #e3f2fd;
  overflow: auto;
  margin: 10px;
  border-radius: 10px;
}
</style>
