<template>
  <div style="position: relative">
    <div class="mainBoard">
      <div
        v-for="(rowArr,rowIndex) in matrix"
        :key="rowIndex"
        class="d-flex"
      >
        <div v-for="i in rowArr" :key="i" class="fakeBoardItem"/>
      </div>
    </div>

    <template
      v-for="(item,index) in matrix.flat(1)"
      :key="index"
    >
      <BoardItem
        :position="flatIndexToMatrixIndex(index,4)"
        v-if="item.value !== 0 "
        :id="generateBoardItemID(index,4)"
        :tile="item.value"
        class="mainBoardItem" style="position: absolute"
      />
    </template>
  </div>
</template>

<script setup lang="ts">

import {ActionType, Logic2048, MatrixItem, Point} from "@/logic/2048Logic";
import BoardItem from "@/views/BoardItem.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {copy} from "@/utils/Utils";
import {gsap} from "gsap";
import {en} from "vuetify/locale";

// eslint-disable-next-line no-undef
const props = defineProps<{
  score:number
}>()

// eslint-disable-next-line no-undef,func-call-spacing
const emits = defineEmits<{
  (e:'update:score',value:number):void
}>()

const _score = computed({
  get:()=> props.score,
  set:(newValue)=> emits("update:score", newValue)
})


function flatIndexToMatrixIndex(flatIndex: number, matrixLength: number): Point {
  return {
    positionY: Math.floor(flatIndex / matrixLength),
    positionX: flatIndex % matrixLength
  }
}

function generateBoardItemID(flatIndex: number, matrixLength: number): string {
  const position = flatIndexToMatrixIndex(flatIndex, matrixLength)
  return `boardItem${position.positionX}${position.positionY}`;
}




const matrix = ref<MatrixItem[][]>([])
const logic2048 = new Logic2048(4)


function onUserEvent(ev:KeyboardEvent) {

  if (!Object.values(ActionType).includes(ev.key)) {
    // alert(ev.key)
    // ev.preventDefault()
    return false
  }

  const actionResult = logic2048.action(
    copy(matrix.value),
    ev.key as ActionType
  )

  _score.value += actionResult.newScore

  const tl = gsap.timeline({
    onComplete: () => {
      matrix.value = actionResult.newMatrix
    }
  })

  actionResult.newMatrix.forEach((matrixRow, rowIndex) => {
    matrixRow.forEach((matrixItem, index) => {

      if (matrixItem.mergeWith) {
        moveItemsAnimation(matrixItem.mergeWith, {
          positionY: rowIndex,
          positionX: index
        }, tl)
      }

      if (matrixItem.position.positionY !== rowIndex || matrixItem.position.positionX !== index) {
        if (matrixItem.value) {
          moveItemsAnimation(matrixItem, {
            positionY: rowIndex,
            positionX: index
          }, tl)
        }
      }
    })
  })
}


onMounted(() => {
  matrix.value = logic2048.initMatrix()
  window.addEventListener("keydown", onUserEvent)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onUserEvent)
})



function positionToPixel(position: Point): { XPixel: number, YPixel: number } {

  return {
    XPixel: (position.positionX) * 108,
    YPixel: (position.positionY) * 108
  }
}

function moveItemsAnimation(matrixItem: MatrixItem, nowPosition: Point, tl: gsap.core.Timeline): void {
  // const lastPixel = positionToPixel(matrixItem.position)
  const nowPixel = positionToPixel(nowPosition)

  tl.to(
    `#boardItem${matrixItem.position.positionX}${matrixItem.position.positionY}`,
    {
      top: `${nowPixel.YPixel}px`,
      left: `${nowPixel.XPixel}px`,
      duration: 0.1
    },
    "<"
  )
}

// function scaleAnimation(x: number, y: number): void {
//   gsap.timeline().to(
//     `#boardItem${x}${y}`,
//     {
//       scale: 1.1,
//       duration: 0.2
//     }).to(
//     `#boardItem${x}${y}`,
//     {
//       scale: 1,
//       duration: 0.4,
//       ease: "elastic.out(1, 0.3)"
//     })
// }

</script>

<style scoped lang="scss">

.mainBoard {
  max-width: max-content !important;
  min-width: max-content !important;

  background: rgba(25, 62, 123, 0.4);
  border-radius: 10px;
}

.mainBoardItem {
  position: absolute;
  border-radius: 10px;
  margin: 4px;
}

.fakeBoardItem {
  position: relative;
  border-radius: 10px;
  margin: 4px;
  width: 100px;
  height: 100px;
  background: rgba(14, 52, 58, 0.25)
}


</style>
