
import { ColumnFilterButton } from './ColumnFilterButton'
import { useState } from 'react'

export function ColumnFilter({ columns, filters, section, setColumnFilterModal }) {
  const [selectedColumns, setSelectedColumns] = useState(filters)

  function handleClose() {
    setColumnFilterModal(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    saveFilterEdit(selectedColumns)
  }

  function modifyDB(){
    setColumnFilterModal(false)
    console.error("NO IMPLEMENTADO REGISTRO PERMANENTE")
  }

  function saveFilterEdit(selectedColumns) {
    const JSONPath = "config.json"
    fetch(JSONPath, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (section === "Investment") {
          data.investmentsIgnoredColumns = selectedColumns
        } else {
          data.coinsIgnoredColumns = selectedColumns
        }
        modifyDB()
      })

  }

  return(

    <form >
      <div className='filterForm'>
        {
          Object.keys(columns)?.map((column, index) => {
            return (
              <ColumnFilterButton key={index} index={index} filters={selectedColumns} setSelectedColumns={setSelectedColumns}>
                {column}
              </ColumnFilterButton>
            )
            
          })
        }
      </div>
      <button type="submit" onClick={handleSubmit}>Aceptar</button>
      <button type="reset" onClick={handleClose}>Cancelar</button>
    </form>
  )
}