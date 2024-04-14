import { WINNING_PLAYS } from '../consts.js'

export function isWinner (board) {
  for (const play of WINNING_PLAYS) {
    const [a, b, c] = play
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return false
}
