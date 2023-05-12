import {rotate, rotateBack} from "@/utils/Utils";

export enum ActionType {
  UP = "ArrowUp",
  LEFT = "ArrowLeft",
  DOWN = "ArrowDown",
  RIGHT = "ArrowRight"
}

export interface Point {
  positionX: number
  positionY: number
}

export interface MatrixItem {
  value: number
  position: Point
  isNewItem?: boolean
  isChanged?: boolean
  mergeWith?: MatrixItem
}

export interface ActionResult {
  newScore: number
  newMatrix: MatrixItem[][]
}


export class Logic2048 {

  score = 0
  squareMatrixSize: number

  constructor(squareMatrixSize: number) {
    this.squareMatrixSize = squareMatrixSize
  }



  private hasEmptyCel(matrix: MatrixItem[][]): boolean {
    return matrix.flat(1).some(value => value.value === 0)
  }

  private addTwoRandomly(matrix: MatrixItem[][]): void {
    if (this.hasEmptyCel(matrix)) {
      let added = false
      while (!added) {
        const row = Math.floor(Math.random() * this.squareMatrixSize)
        const col = Math.floor(Math.random() * this.squareMatrixSize)

        if (matrix[row][col].value === 0) {
          matrix[row][col].value = 2
          matrix[row][col].isNewItem = true
          added = true
        }
      }
    }
  }

  public initMatrix(): MatrixItem[][] {
    const matrix: MatrixItem[][] = []

    for (let i = 0; i < this.squareMatrixSize; i++) {
      matrix.push([])
      for (let j = 0; j < this.squareMatrixSize; j++) {
        matrix[i].push({
          position: {
            positionY: i,
            positionX: j
          },
          value: 0
        })
      }
    }

    this.addTwoRandomly(matrix)
    this.addTwoRandomly(matrix)

    return matrix
  }


  private resetFlags(matrix: MatrixItem[][]): void {
    matrix.forEach((matrixRow,rowIndex) => {
      matrixRow.forEach((matrixItem, index) => {
        matrixItem.isNewItem = false
        matrixItem.isChanged = false
        matrixItem.mergeWith = undefined
        matrixItem.position = {
          positionY: rowIndex,
          positionX: index
        }
      })
    })
  }

  private exchangeMatrixItems(matrixRow: MatrixItem[], firstItemIndex: number, zeroItemIndex: number): void {
    matrixRow[firstItemIndex] = JSON.parse(JSON.stringify(matrixRow[zeroItemIndex])) as MatrixItem

    matrixRow[zeroItemIndex].value = 0
    matrixRow[zeroItemIndex].isNewItem = false
    matrixRow[zeroItemIndex].isChanged = false
    matrixRow[zeroItemIndex].mergeWith = undefined

  }


  private shiftZeroToEnd(matrixRow: MatrixItem[]): MatrixItem[] {
    matrixRow.forEach((matrixItem, index) => {
      if (!matrixItem.value) {
        for (let i = index + 1; i < matrixRow.length; i++) {
          if (matrixRow[i].value > 0) {
            this.exchangeMatrixItems(matrixRow, index, i)
            break
          }
        }
      }
    })
    return matrixRow
  }


  private slideToLeft(matrixRow: MatrixItem[]): MatrixItem[] {
    matrixRow.forEach((matrixItem: MatrixItem, index) => {
      if (matrixItem.value) {
        for (let i = index + 1; i < matrixRow.length; i++) {

          if (!matrixRow[i].value) continue
          if (matrixRow[i].value === matrixItem.value) {

            matrixRow[index].value *= 2
            matrixRow[index].isChanged = true
            matrixRow[index].mergeWith = JSON.parse(JSON.stringify(matrixRow[i])) as MatrixItem

            matrixRow[i].value = 0

            this.score += matrixRow[index].value
          }
          break
        }
      }
    })

    return this.shiftZeroToEnd(matrixRow)
  }


  public action(matrix: MatrixItem[][], move: ActionType): ActionResult {

    this.score = 0
    this.resetFlags(matrix)

    switch (move) {
      case ActionType.UP:
        // eslint-disable-next-line no-case-declarations
        const rotatedMatrix = rotate(matrix)
        rotatedMatrix.forEach((row, index) => {
          rotatedMatrix[index] = this.slideToLeft(row.reverse()).reverse()
        })
        matrix = rotateBack(rotatedMatrix)
        break;

      case ActionType.DOWN:
        // eslint-disable-next-line no-case-declarations
        const rotatedMatrix2 = rotate(matrix)
        rotatedMatrix2.forEach((row, index) => {
          rotatedMatrix2[index] = this.slideToLeft(row)
        })
        matrix = rotateBack(rotatedMatrix2)
        break;

      case ActionType.LEFT:
        matrix.forEach((row, index) => {
          matrix[index] = this.slideToLeft(row)
        })
        break;

      case ActionType.RIGHT:
        matrix.forEach((row, index) => {
          matrix[index] = this.slideToLeft(row.reverse()).reverse()
        })
        break;
    }

    this.addTwoRandomly(matrix)


    return {
      newMatrix: matrix,
      newScore: this.score
    }
  }

}

