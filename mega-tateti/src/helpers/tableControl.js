import { WINNING_PLAYS, TURNS } from '../consts.js'

export function isWinner (board) {
  for (const play of WINNING_PLAYS) {
    const [a, b, c] = play
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log(`Ganado por ${board[a]}`)
      return board[a]
    }
  }
  return false
}

export function getBooleanIndexes (array, bool) {
  const indexes = []
  array.forEach((element, index) => {
    if (element === bool || element === TURNS.x || element === TURNS.o) {
      indexes.push(index)
    }
  })
  return indexes
}

export function getCSSTurn (turn) {
  if (turn === '✖️') return 'XTurn'
  return 'OTurn'
}
