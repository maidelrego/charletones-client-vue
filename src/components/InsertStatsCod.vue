<template>
  <div class="flex align-items-center justify-content-center">
    <h3>Team Winner</h3>
  </div>
  <div>
    <div class="grid">
      <div v-for="team in teams" :key="team._id" class="col-12 md:col-6 lg:col-6 text-center">
        <RadioButton
          :inputId="team._id"
          name="category"
          :value="team._id"
          v-model="selectedWinner"
        />
        <label class="label" :for="team._id">{{ team.name }}</label>
      </div>
    </div>
    <div class="flex align-items-center justify-content-center">
      <h3>Game Mode</h3>
    </div>
    <div class="flex align-items-center justify-content-center">
      <Dropdown
        v-model="selectedMode"
        :options="codModes"
        optionLabel="name"
        optionValue="code"
        placeholder="Select a City"
        class="w-full md:w-14rem"
      />
    </div>
    <div class="flex align-items-center justify-content-center mt-3">
      <h3>Player Stats</h3>
    </div>
    <div class="grid">
      <div v-for="(form, index) in playerForms" :key="index" class="col-12 sm:col-12 md:col-6 lg:col-4">
        <Card>
          <template #header>
            <div class="cardHeader">
              <span class="tableHeader">{{ form.userName }}</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column align-items-center justify-content-center">
              <div class="field grid">
                <label for="kills" class="col-fixed" style="width: 60px">Kills</label>
                <div class="col">
                  <InputText type="number" id="kills" v-model="form.kills" />
                </div>
              </div>
              <div class="field grid">
                <label for="deaths" class="col-fixed" style="width: 60px">Deaths</label>
                <div class="col">
                  <InputText type="number" id="deaths" v-model="form.deaths" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="myDivider"></div>
    <div class="col-12 text-center">
      <Button @click="submitStats()" :disabled="isFormInvalid" label="Send" class="p-button w-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { ref, onBeforeMount, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import { doAPIPost } from '@/services/api'
import { useSpinnerStore } from '@/stores/spinner'
import { useTeamStore } from '../stores/teams'
import { useCodStatsStore } from '../stores/codStats';
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import type { Participant } from '@/interfaces/Cod'

interface Form {
  win: string
  mode: number
  participants: Participant[]
}
const spinnerStore = useSpinnerStore()
const userStore = useUserStore()
const teamStore = useTeamStore()
const codStats = useCodStatsStore()
const { users } = storeToRefs(userStore)
const { teams } = storeToRefs(teamStore)
const statsForms = ref<Form>({
  win: '',
  mode: 0,
  participants: []})
const playerForms = ref<Participant[]>([])
const selectedWinner = ref<string>()
const selectedMode = ref()
const emit = defineEmits(['closeDialog'])
const codModes = ref([
  { name: 'Team Deathmatch', code: 1 },
  { name: 'Search & Destroy', code: 2 },
  { name: 'Domination', code: 3 },
  { name: 'Hardpoint', code: 4 },
  { name: 'Capture the Flag', code: 5 },
  { name: 'Kill Confirmed', code: 6 },
  { name: 'Control', code: 7 }
])

const isFormInvalid = computed(() => {
  return (
    !selectedWinner.value ||
    !selectedMode.value ||
    playerForms.value.some((form) => {
      return form.kills === null || form.deaths === null || form.kills === null || form.deaths === null;
    })
  );
});

watchEffect(() => {
  if (selectedWinner.value) {
    if (statsForms.value !== undefined) {
      statsForms.value.win = selectedWinner.value
    }
  }

  if (selectedMode.value) {
    if (statsForms.value !== undefined) {
      statsForms.value.mode = selectedMode.value
    }
  }
});

const submitStats = async () => {
  statsForms.value.participants = playerForms.value
  if (isFormInvalid.value) return
  spinnerStore.setLoadingState(true)
  await doAPIPost('cod-games', statsForms.value)
  codStats.loadCodStats()
  spinnerStore.setLoadingState(false)
  emit('closeDialog')
}

onBeforeMount(async () => {
  for (const user of users.value) {
    playerForms.value.push({
      kills: null,
      deaths: null,
      user: user._id,
      userName: user.fullName
    })
  }
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
