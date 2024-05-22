import { InvestmentRow } from '#/components/InvestmentRow'
import { orderBy, isFiltered } from '#/handlers/tableHandlers.js'
import { ColumnFilter } from '#/components/ColumnFilter'
import { useEffect, useState } from 'react'

export function InvestmentsTable({ investments, ignoredColumns, investmentsTableStyler, coinsData }) {
  const [orderedInvestments, setOrderedInvestments] = useState(investments)
  const [orderedCoinsData, setOrderedCoinsData] = useState(null)
  const [columnFilterModal, setColumnFilterModal] = useState(false)
  // console.log(investments)
  
  function handleClick (e) {
    const newData = orderBy(e, orderedInvestments)
    setOrderedInvestments(newData)
  }

  
  function columnModal() {
    setColumnFilterModal(true)
  }

  function orderCoinsData(coinsData) {
    const updateCoinData = {}
    for (const coin of coinsData) {
      // orderedCoinsData[coin.name] = coin
      updateCoinData[coin.name] = coin
    }
    return updateCoinData
    // return orderedCoinsData
  }

  useEffect(() => {
    if (coinsData.length > 0) {
      setOrderedCoinsData(orderCoinsData(coinsData))
      // console.log({orderedCoinsData})
    }
  }, [coinsData])

  function calcCompoundInterest(capital, rate, elapsedDays) {
    const compoundInterest = (capital * Math.pow((1 + rate / 365), elapsedDays) - capital)
    return compoundInterest
  }

  function updateInvestment(investment) {
    // const finalInvestment = JSON.parse(JSON.stringify(investment))
    const finalInvestment = structuredClone(investment)
    const today = new Date()
    const investmentDate = new Date(investment.date)
    finalInvestment.date = investmentDate.toLocaleDateString()
    const elapsedDays = new Date(today - investmentDate).getDate()

    finalInvestment.token_earn = parseFloat(calcCompoundInterest(investment.coin_ammount, investment.int_rate, elapsedDays).toFixed(5))
    finalInvestment.total_tokens = parseFloat((finalInvestment.token_earn + investment.coin_ammount)).toFixed(5)

    finalInvestment.int_earn = parseFloat((finalInvestment.token_earn * orderedCoinsData[investment.coin].price).toFixed(5))


    return finalInvestment
  }

  return (
    <>
      <button onClick={columnModal}>Seleccionar Columnas</button>
      {
        columnFilterModal 
          ? <ColumnFilter 
            columns = {investmentsTableStyler} 
            filters = {ignoredColumns}
            section = {"Investment"}
            setColumnFilterModal = {setColumnFilterModal}
          /> 
          : null
      }
      <table>
        <thead>
          <tr>
            {
              Object.keys(investmentsTableStyler)?.map((investmentHeader) => {
                if (isFiltered(investmentHeader, ignoredColumns)) return null
                return (
                  <th key={investmentHeader} id={investmentHeader} onClick={handleClick}>
                    {investmentsTableStyler[investmentHeader].name}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            !orderedCoinsData
              ? <tr><td>nada</td></tr>
              : (
                orderedInvestments.map((investment) => {
                  const updatedInvestment = updateInvestment(investment)
                  return <InvestmentRow key={investment.uuid}
                    investment={updatedInvestment}
                    ignoredColumns={ignoredColumns}
                    investmentsTableStyler={investmentsTableStyler}
                    orderedCoinsData={orderedCoinsData}
                  />
                })
              )
          }
        </tbody>
      </table>
    </>
  )
}
