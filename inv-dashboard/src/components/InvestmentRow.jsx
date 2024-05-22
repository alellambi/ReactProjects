import { isFiltered } from "#/handlers/tableHandlers.js"

export function InvestmentRow({ investment, ignoredColumns, investmentsTableStyler, orderedCoinsData }) {
  console.log(orderedCoinsData)
  return (
    <tr>
      {
        !investment
          ? <td>NADA</td>
          : (
            Object.keys(investment).map((column, index) => {
              if (isFiltered(column, ignoredColumns)) return null
              // if (ignoredColumns.includes(column)) return null
              if (column === 'ammount') {
                investment[column] = investment[column].toLocaleString('es')
              }
              if (column === 'int_earn') {
                investment[column] = investment[column].toLocaleString('es')
              }
              let dynamicClass = investmentsTableStyler[column].class

              if (column === 'coin_value') {
                try {
                  console.log(investment[column])
                  console.log(orderedCoinsData[investment.coin].price)
                  console.log(investment[column] > orderedCoinsData[investment.coin].price)
                  if (investment[column] > orderedCoinsData[investment.coin].price) {
                    dynamicClass = dynamicClass.replace('profitCell', '')
                  }
                } catch {
                  console.log('Error')
                }
                investment[column] = investment[column].toLocaleString('es')
              }
              return (
                <td key={index} className={dynamicClass}>
                  {investment[column]}
                  <div className="tooltip">
                    <span className="tooltipText">Precio Actual: ${parseFloat(orderedCoinsData[investment.coin].price).toLocaleString('es')}<br/>
                    Dif: %{((parseFloat(orderedCoinsData[investment.coin].price)*100/parseFloat(investment[column]))-100).toLocaleString('es')}</span>
                  </div>
                </td>

              )
            }))
      }
    </tr>
  )
}
