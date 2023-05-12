<template>
  <v-app>
    <v-container fluid class="ma-0 pa-0 bgMain fill-height">
      <GamePage/>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">

import GamePage from '@/views/GamePage.vue'

</script>

<style>

.bgMain {
  background: linear-gradient(127deg, rgba(68, 140, 65, 1) 20%, rgba(22, 56, 129, 1) 100%);
}


</style>
