import './App.css'
// import './index.css'
import { Table } from '#/components/Table.jsx'
import { Subtable } from '#/components/Subtable.jsx'
import { TABLE, TURNS, SUBTABLE_PLAYS } from '#/consts.js'

import { useState } from 'react'
import { isWinner } from '#/helpers/winner.js'

function App () {
  const [turn, setTurn] = useState(TURNS.x)
  const [table, setTable] = useState(TABLE)
  const [subtableStatus, setSubtableStatus] = useState(SUBTABLE_PLAYS)
  const [disabledSubtables, setDisabledSubtables] = useState(SUBTABLE_PLAYS)
  const [winner, setWinner] = useState(null)

  // console.log('Habilitado', getBooleanIndexes(disabledSubtables, false))
  // console.log('Terminados', getBooleanIndexes(subtableStatus, true))

  function checkPartialWinner (newTable) {
    newTable.forEach((subtable, index) => {
      let finishedBoard = isWinner(subtable)
      if (finishedBoard) {
        console.log(finishedBoard)
        const newSubtableStatus = [...subtableStatus]
        newSubtableStatus[index] = finishedBoard
        setSubtableStatus(newSubtableStatus)
        checkWinner(newSubtableStatus)
        finishedBoard = false
      }
    })
  }

  function getBooleanIndexes (array, bool) {
    const indexes = []
    array.forEach((element, index) => {
      if (element === bool || element === TURNS.x || element === TURNS.o) {
        indexes.push(index)
      }
    })
    return indexes
  }

  function handlePlay (index, subIndex) {
    if (disabledSubtables[index] || subtableStatus[index]) {
      return
    }

    // Imprimir jugada
    const newTable = JSON.parse(JSON.stringify(table))
    newTable[index][subIndex] = turn

    // Actualizar turno y tablero
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    setTable(newTable)

    // Controlar si la subtabla finalizó
    checkPartialWinner(newTable)
    console.log(subtableStatus)
    // Deshabilitar tableros no correspondientes
    const newDisabled = [...disabledSubtables]
    newDisabled.fill(true)
    newDisabled[subIndex] = false

    setDisabledSubtables(newDisabled)

    if (getBooleanIndexes(subtableStatus, true)[0] === subIndex) {
      setDisabledSubtables(disabledSubtables.fill(false))
    }

    // console.log('Habilitado', getBooleanIndexes(disabledSubtables, false))
    // console.log('Terminados', getBooleanIndexes(subtableStatus, true))
  }

  // function getFinished () {
  //   return getBooleanIndexes(subtableStatus, true)
  // }

  // function getEnabled () {
  //   return getBooleanIndexes(disabledSubtables, false)
  // }

  function restartGame () {
    setTurn(TURNS.x)
    setTable(TABLE)
    setSubtableStatus(SUBTABLE_PLAYS)
  }

  function checkWinner (subtableStatus) {
    // console.log(subtableStatus)
    const win = isWinner(subtableStatus)
    if (win) {
      setWinner(win)
    }
  }

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
