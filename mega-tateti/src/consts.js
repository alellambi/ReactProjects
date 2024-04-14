/* eslint-disable prefer-const */
export const TURNS = {
  x: '✖️',
  o: '⭕'
}

export const SUBTABLE = Array(9)
export const TABLE = Array(9).fill(SUBTABLE.fill(''))

export const WINNING_PLAYS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 4, 2],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8]
]

export const SUBTABLE_PLAYS = Array(9).fill(false)
