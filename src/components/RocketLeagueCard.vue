<template>
  <div>
    <RocketLeagueTeamStats :teamId="props.teamObj._id" />
    <div class="myDivider"></div>
    <div>
      <h1 class="text-center">The Team</h1>
    </div>
    <RocketLeagueTeamMembers :membersProp="props.teamObj.members" />
  </div>
</template>

<script setup lang="ts">
// import TeamMembers from './TeamMembers.vue';
import RocketLeagueTeamMembers from './RocketLeagueTeamMembers.vue';
import RocketLeagueTeamStats from './RocketLeagueTeamStats.vue';

interface TeamObj {
  _id: string
  name: string
  avatar: string
  members: {
    _id: string
    fullName: string
    avatar: string
    roles: string[]
  }[]
}

const props = defineProps<{
  teamObj: TeamObj
}>()
</script>

<style scoped></style>
