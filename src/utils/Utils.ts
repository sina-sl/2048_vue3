
export function copy<T>(input:T):T {
  return JSON.parse(JSON.stringify(input)) as T
}

export function rotate<T>(matrix: T[][]): T[][] {
  const matrixPrime = copy(matrix)

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrixPrime[j][i] = matrix[i][j]
    }
  }

  for (let i = 0; i < matrixPrime.length; i++) {
    matrixPrime[i] = matrixPrime[i].reverse()
  }

  return matrixPrime
}


export function rotateBack<T>(matrix: T[][]): T[][] {
  const matrixPrime = copy(matrix)

  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].reverse()
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrixPrime[j][i] = matrix[i][j]
    }
  }

  return matrixPrime
}
