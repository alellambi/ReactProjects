import './App.css'
// import './index.css'
import { useState } from 'react'

import { Table } from '#/components/Table.jsx'
import { Subtable } from '#/components/Subtable.jsx'
import { TABLE, TURNS, SUBTABLE_PLAYS } from '#/consts.js'
import { isWinner, getBooleanIndexes, getCSSTurn } from '#/helpers/tableControl.js'

function App () {
  const [turn, setTurn] = useState(TURNS.x)
  const [table, setTable] = useState(TABLE)
  const [subtableStatus, setSubtableStatus] = useState(SUBTABLE_PLAYS)
  const [disabledSubtables, setDisabledSubtables] = useState(SUBTABLE_PLAYS)
  const [winner, setWinner] = useState(null)

  function checkPartialWinner (newTable) {
    const newSubtableStatus = [...subtableStatus]
    newTable.forEach((subtable, index) => {
      const finishedBoard = isWinner(subtable)
      if (finishedBoard) {
        // console.log(finishedBoard)
        newSubtableStatus[index] = finishedBoard
        setSubtableStatus(newSubtableStatus)
        checkWinner(newSubtableStatus)
      }
    })
    return newSubtableStatus
  }

  function cleanDisabled () {
    const newDisabled = [...disabledSubtables].fill(false)
    subtableStatus.forEach((element, index) => {
      if (element) {
        newDisabled[index] = true
      }
    })
    return newDisabled
  }

  function disableSubtables (subIndex) {
    const newDisabled = [...disabledSubtables]
    newDisabled.fill(true)
    newDisabled[subIndex] = false
    return newDisabled
  }

  function handlePlay (index, subIndex) {
    // Impedir jugar en subtablas completas o inhabilitadas
    if (disabledSubtables[index] || (subtableStatus[index])) return

    // Registrar jugada
    const newTable = JSON.parse(JSON.stringify(table))
    newTable[index][subIndex] = turn

    // Actualizar turno y tablero
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    setTable(newTable)

    // Controlar si la subtabla finalizó y si alguien ganó
    const finishedSubtables = checkPartialWinner(newTable)

    // Limpiar Inhabilitados si se va a sutabla terminada
    if (getBooleanIndexes(finishedSubtables, true).includes(subIndex)) {
      setDisabledSubtables(cleanDisabled())
      return
    }

    // Deshabilitar tableros no correspondientes
    const newDisabled = disableSubtables(subIndex)
    setDisabledSubtables(newDisabled)

    // console.log({ 'Posicion Jugada': `${index}, ${subIndex}`, 'Indices Terminados': getBooleanIndexes(finishedSubtables, true), 'Indices Inhabilitados': getBooleanIndexes(newDisabled, true) })
  }

  function restartGame () {
    setTurn(TURNS.x)
    setTable(TABLE)
    setDisabledSubtables(SUBTABLE_PLAYS)
    setSubtableStatus(SUBTABLE_PLAYS)
    setWinner(null)
  }

  function checkWinner (subtableStatus) {
    // console.log(subtableStatus)
    const win = isWinner(subtableStatus)
    if (win) {
      setWinner(win)
    }
  }

  const CSSTurn = getCSSTurn(turn)

  return (
    <>
      {
        winner
          ? (<div>{winner}</div>)
          : null
      }
      <article className='game'>
        <Table>
          {table.map((_, index) => {
            return (
              <Subtable key ={'t' + index}
                subtable = {table[index]}
                index = {index}
                handlePlay = {handlePlay}
                isFinished = {subtableStatus[index]}
                isDisabled = {disabledSubtables[index]}
                turn = {CSSTurn}
              />
            )
          }
          )}
        </ Table>
      </article>
      <button onClick={restartGame}>
        RESTART GAME
      </button>
    </>
  )
}

export default App
