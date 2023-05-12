<template>
  <v-responsive
    :aspect-ratio="1"
    width="100"
    height="100"
    :style="style"
  >
    <v-row
      no-gutters
      justify="center"
      align="center"
      :style="itemStyle"
      class="fill-height"
    >
      <h2>
        {{ !showZero && tile === 0 ? '' : tile }}
      </h2>
    </v-row>
  </v-responsive>
</template>

<script setup lang="ts">

import {computed, defineProps, PropType} from 'vue'
import {Point} from "@/logic/2048Logic";

const props = defineProps({
  size: {default: 100, type: Number},
  tile: {required: true, type: Number},
  showZero: {default: false, type: Boolean},
  position: {required: true, type: Object as PropType<Point>}
})

const pixel = positionToPixel(props.position)
const style: Partial<CSSStyleDeclaration> = {
  top: `${pixel.YPixel}px`,
  left: `${pixel.XPixel}px`
}


function positionToPixel(position: Point): { XPixel: number, YPixel: number } {

  return {
    XPixel: (position.positionX) * 108,
    YPixel: (position.positionY) * 108
  }
}


const itemStyle = computed<Partial<CSSStyleDeclaration>>(() => {
  switch (props.tile) {
    case 0:
      return {
        backgroundColor: 'rgba(14,52,58,0.25)'
      }
    case 2:
      return {
        backgroundColor: '#eee4da',
        color: '#727371'
      }
    case 4:
      return {
        backgroundColor: '#ece0ca',
        color: '#727371'
      }
    case 8:
      return {
        backgroundColor: '#f4b17a',
        color: 'white'
      }
    case 16:
      return {
        backgroundColor: '#f59575',
        color: 'white'
      }
    case 32:
      return {
        backgroundColor: '#f57c5f',
        color: 'white'
      }
    case 64:
      return {
        backgroundColor: '#f65d3d',
        color: 'white'
      }
    case 128:
      return {
        backgroundColor: '#edce71',
        color: 'white'
      }
    case 256:
      return {
        backgroundColor: '#edcc63',
        color: 'white'
      }
    case 512:
      return {
        backgroundColor: '#edc651',
        color: 'white'
      }
    case 1024:
      return {
        backgroundColor: '#eec744',
        color: 'white'
      }
    case 2048:
      return {
        backgroundColor: '#ecc230',
        color: 'white'
      }
    case 4096:
      return {
        backgroundColor: '#fe3d3d',
        color: 'white'
      }
    default:
      return {
        backgroundColor: '#ff2020',
        color: 'white'
      }
  }
})

</script>

<style scoped>

</style>
