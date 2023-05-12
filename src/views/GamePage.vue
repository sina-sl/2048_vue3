<template>
  <div class="d-flex flex-column align-center">
    <h3 class="mt-5">
      score : {{ score }}
    </h3>

    <GameBoard v-model:score="score" class="mt-5"/>

    <h3 class="mt-5 text-center">
      Swipe to move. 2 + 2 = 4. Reach 2048.
      <br> Use ← ↑ → ↓ for move items
    </h3>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import GameBoard from "@/views/GameBoard.vue";

const score = ref<number>(0)


</script>

<style>



</style>
