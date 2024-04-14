import './App.css'
import './index.css'
import { Table } from '#/components/Table.jsx'
import { Subtable } from '#/components/Subtable.jsx'
import { TABLE, TURNS } from '#/consts.js'

import { useState } from 'react'

function App () {
  const [turn, setTurn] = useState(TURNS.x)
  const [table, setTable] = useState(TABLE)
  // const [subtable, setSubtable] = useState(SUBTABLE)
  console.log(table)

  function handlePlay (index, subIndex) {
    const newTable = JSON.parse(JSON.stringify(table))
    // const newTable = structuredClone(table)
    // console.log(index, subIndex)
    newTable[index][subIndex] = turn

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    console.log('Siguiente turno', turn)
    setTable(newTable)
  }

  return (
    <main className='game'>
      <Table>
        {table.map((_, index) => {
          return (
            <Subtable key ={'t' + index}
            subtable = {table[index]}
            index = {index}
            handlePlay = {handlePlay}
            />
          )
        }
      )}
      </ Table>
    </main>
  )
}

export default App
