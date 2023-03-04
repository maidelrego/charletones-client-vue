<template>
  <div class="flex align-items-center justify-content-center">
    <h3>Winner</h3>
  </div>
  <div>
    <div class="grid">
      <div v-for="user in users" :key="user._id" class="col-12 md:col-3 lg:col-3 text-center">
        <RadioButton :inputId="user._id" name="category" :value="user._id" v-model="selectedWinner" />
        <label class="label" :for="user._id">{{ user.fullName }}</label>
      </div>
    </div>
    <div class="flex align-items-center justify-content-center mt-5">
      <h3>Argoyas?</h3>
    </div>
    <div class="grid">
      <div v-for="user in users" :key="user._id" class="col-12 md:col-3 lg:col-3 text-center">
        <Checkbox :disabled="selectedWinner === user._id" :inputId="user._id" name="category" :value="user._id"
          v-model="selectedArgoyas" />
        <label class="label" :for="user._id">{{ user.fullName }}</label>
      </div>
    </div>
    <div class="myDivider"></div>
    <div class="col-12 text-center">
      <Button @click="submitStats()" label="Send" class="p-button w-3" color="red" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users';
import { useGameModeStore } from '@/stores/gameMode';
import { ref, onBeforeMount, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import { doAPIPost } from '@/services/api';
import { useSpinnerStore } from '@/stores/spinner';
import { useStatsStore } from '../stores/stats';

const spinnerStore = useSpinnerStore();
const statsStore = useStatsStore();

interface Form {
  kills: number;
  deaths: number;
  argoya: boolean;
  win: boolean;
  mode_id: typeof getSelectedGameMode;
  user_id: string;
}

const userStore = useUserStore();
const { getSelectedGameMode } = useGameModeStore();
const { users } = storeToRefs(userStore)
const playerForms = ref<Form[]>([]);
const selectedWinner = ref<string>();
const selectedArgoyas = ref<string[]>([]);
const emit = defineEmits(['closeDialog'])

watchEffect(() => {
  if (selectedWinner.value) {
    selectedArgoyas.value = selectedArgoyas.value.filter((argoya) => argoya !== selectedWinner.value);
    updatePlayerForms(selectedWinner.value, selectedArgoyas.value);
  }

});

const updatePlayerForms = (winner: string, argoyas: string[]) => {
  // reset all values
  playerForms.value.map((player) => {
    player.argoya = false;
    player.win = false;
  });

  // update values
  playerForms.value.map((player) => {
    if (player.user_id === winner) {
      player.win = true;
    }
    if (argoyas.includes(player.user_id)) {
      player.argoya = true;
    }
  });

}


const submitStats = async () => {
  spinnerStore.setLoadingState(true);
  for (const stat of playerForms.value) {
    console.log(stat);
    await doAPIPost('games', stat)
  }
  spinnerStore.setLoadingState(false);
  statsStore.loadStats();
  emit('closeDialog');
}

onBeforeMount(async () => {
  await userStore.loadUsers();
  users.value.map((user) => (
    playerForms.value.push({
      kills: 0,
      deaths: 0,
      argoya: false,
      win: false,
      mode_id: getSelectedGameMode,
      user_id: user._id,
    })
  ));
})



</script>

<style scoped>
::v-deep(.p-button) {
  background-color: #2084f3;
}

::v-deep(.p-button-label) {
  color: #fff;
  font-family: sophia, sans-serif;
  font-weight: 700;
  font-size: 1rem;
}

.myDivider {
  border-top: 3px solid #2084f3;
  margin: 1rem 0;
  margin-top: 3rem;
  border-radius: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
}

.label {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  font-family: sophia, sans-serif;
  margin-left: 0.5rem;
}

.winnersTableCard {
  background-color: #2a2e35;
}
</style>