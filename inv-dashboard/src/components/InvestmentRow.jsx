export function InvestmentRow ({ updatedInvestment, ignoredColumns, tableStyler, orderedCoinsData }) {
  console.log(updatedInvestment)
  return (
            <tr>
            {
              Object.keys(updatedInvestment).map((column, index) => {
                if (ignoredColumns.includes(column)) return null
                if (column === 'ammount') {
                  updatedInvestment[column] = updatedInvestment[column].toLocaleString('es')
                }
                let dynamicClass = tableStyler[column].class

                if (column === 'coin_value') {
                  try {
                    if (updatedInvestment[column] > orderedCoinsData[updatedInvestment.coin].price) {
                      dynamicClass = dynamicClass.replace('profitCell', '')
                    }
                  } catch {
                    console.log('Error')
                  }
                }
                return (
                  <td key={index} className={dynamicClass}>
                  {updatedInvestment[column]}
                </td>
                )
              })
          }
          </tr>
  )
}
