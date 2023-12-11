<template>
  <div>
    <div class="flex align-items-center justify-content-center">
      <h3>Participants</h3>
    </div>
    <div class="flex align-items-center justify-content-center">
      <div class="p-float-label">
        <Dropdown
          v-model="selectedTeam1"
          :options="teams"
          optionLabel="name"
          inputId="team1"
          optionValue="_id"
          placeholder="Team 1"
          class="w-full md:w-14rem"
          optionDisabled="disabled"
          @change="setTeam1(selectedTeam1)"
        />
        <label for="team1">Team 1</label>
      </div>

      <div class="p-float-label">
        <Dropdown
          v-model="selectedTeam2"
          :options="teams"
          optionLabel="name"
          inputId="team2"
          optionValue="_id"
          placeholder="Team 2"
          class="w-full md:w-14rem"
          @change="setTeam2(selectedTeam2)"
        />
        <label for="team2">Team 2</label>
      </div>
    </div>

    <div class="flex align-items-center justify-content-center mt-3">
      <h3>Team Winner</h3>
    </div>
    <div class="grid flex align-items-center justify-content-center">
      <div class="p-float-label">
        <Dropdown
          v-model="selectedWinner"
          :options="teams"
          optionLabel="name"
          inputId="winner"
          optionValue="_id"
          placeholder="Winner"
          class="w-full md:w-14rem"
          @change="setWinner(selectedWinner)"
        />
        <label for="winner">Winner</label>
      </div>
    </div>

    <div class="myDivider"></div>
    <div class="col-12 text-center">
      <Button @click="submitStats()" :disabled="isFormInvalid" label="Send" class="p-button w-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { doAPIPost } from '@/services/api'
import { useSpinnerStore } from '@/stores/spinner'
import { useTeamStore } from '../stores/teams'
import Dropdown from 'primevue/dropdown'
import type { Team } from '@/interfaces/RocketLeague'
import { useRocketLeagueStatsStore } from '@/stores/rocketLeagueStats'

interface Form {
  win: string
  participants: Team[]
}
const spinnerStore = useSpinnerStore()
const teamStore = useTeamStore()
const { teams } = storeToRefs(teamStore)
const rocketLeagueStats = useRocketLeagueStatsStore()

const statsForms = ref<Form>({
  win: '',
  participants: []
})

const selectedTeam1 = ref<string>()
const selectedTeam2 = ref<string>()
const selectedWinner = ref<string>()
const disabledFlag = ref<boolean>(false)

const setTeam1 = (value: any) => {
  statsForms.value.participants[0] = value
}

const setTeam2 = (value: any) => {
  statsForms.value.participants[1] = value
}

const setWinner = (value: any) => {
  statsForms.value.win = value
}

const emit = defineEmits(['closeDialog'])

const isFormInvalid = computed(() => {
  const winnerIsNotSelectedTeam =
    !selectedTeam1.value ||
    !selectedTeam2.value ||
    (selectedWinner.value !== selectedTeam1.value && selectedWinner.value !== selectedTeam2.value)

  return (
    !selectedWinner.value ||
    !selectedTeam1.value ||
    !selectedTeam2.value ||
    selectedTeam1.value === selectedTeam2.value ||
    winnerIsNotSelectedTeam
  )
})

watchEffect(() => {
  if (selectedTeam1.value === selectedTeam2.value) {
    disabledFlag.value = true
  } else {
    disabledFlag.value = false
  }
})

const submitStats = async () => {
  if (isFormInvalid.value) return
  spinnerStore.setLoadingState(true)
  await doAPIPost('rocket-league-games', statsForms.value)
  rocketLeagueStats.loadRocketLeagueStats()
  spinnerStore.setLoadingState(false)
  emit('closeDialog')
}
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
