import { InvestmentRow } from '#/components/InvestmentRow'
import { useEffect, useState } from 'react'

export function InvestmentsTable ({ investments, ignoredColumns, coinsData }) {
  console.log(investments)
  const [orderedCoinsData, setOrderedCoinsData] = useState(null)
  const tableStyler =
  {
    date: { name: 'Fecha', class: 'dateCell' },
    ammount: { name: 'Pesos Invertidos', class: 'pesosCell' },
    usd: { name: 'Dolares Al Día', class: 'dollarCell' },
    final_ammount: { name: 'Dolares Totales', class: 'dollarCell' },
    coin: { name: 'Token', class: '' },
    coin_ammount: { name: 'Cant. Tokens', class: '' },
    int_rate: { name: 'Intereses Anuales', class: 'percentageCell' },
    coin_value: { name: 'Valor de Token', class: 'profitCell deficitCell' },
    token_earn: { name: 'Tokens Generados', class: '' },
    total_tokens: { name: 'Tokens Totales', class: '' },
    int_earn: { name: 'USD Generados', class: 'dollarCell' }
  }

  function orderCoinsData (coinsData) {
    for (const coin of coinsData) {
      orderedCoinsData[coin.name] = coin
    }
    return orderedCoinsData
  }

  useEffect(() => {
    setOrderedCoinsData(orderCoinsData(coinsData))
    console.log(orderedCoinsData)
  }, [coinsData])

  function updateInvestment (investment) {
    const finalInvestment = JSON.parse(JSON.stringify(investment))
    const today = new Date()
    const investmentDate = new Date(investment.date)
    finalInvestment.date = investmentDate.toLocaleDateString()
    const elapsedDays = new Date(today - investmentDate).getDate()
    if (orderedCoinsData[investment]) {
      console.log({ orderedCoinsData })
      finalInvestment.token_earn = investment.coin_ammount * (1 + ((investment.int_rate / 365) ^ (elapsedDays)) - investment.coin_ammount)
      finalInvestment.total_tokens = investment.coin_ammount + investment.token_earn
      finalInvestment.int_earn = investment.token_earn * orderedCoinsData[investment.name].price
    }

    return finalInvestment
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys(tableStyler).map((investmentHeader) => {
                if (ignoredColumns.includes(investmentHeader)) return null
                return (
                  <th key={investmentHeader}>
                    {tableStyler[investmentHeader].name}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
        {
            orderedCoinsData
              ? <tr><td>nada</td></tr>
              : (
                  investments.map((investment) => {
                    return <InvestmentRow key={investment.uuid}
                      investment={updateInvestment(investment)}
                      ignoredColumns={ignoredColumns}
                      tableStyler={tableStyler}
                      orderCoinsData={orderedCoinsData}
                      />
                  })
                )
          }
        </tbody>
      </table>
    </>
  )
}
