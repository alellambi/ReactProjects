import { isFiltered } from '#/handlers/tableHandlers.js'
import { useState } from 'react'

export function ColumnFilterButton({ children, index, filters, setSelectedColumns }){
  const [selected, setSelected] = useState(isFiltered(children, filters) ? "selected" : "")

  function handleClick(e) {
    const newSelected = selected === "" ? "selected" : ""
    const value = e.target.textContent
    if (newSelected) {
      filters.push(value)
    } else {
      filters.splice(filters.indexOf(value), 1)
    }
    setSelectedColumns(filters)
    setSelected(newSelected)
  }

  return(
    <div 
      key={index} 
      className={`filter ${selected}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}