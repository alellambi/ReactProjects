export function InvestmentRow({ investment, ignoredColumns, investmentsTableStyler, orderedCoinsData }) {
  // console.log(investment)
  return (
    <tr>
      {
        !investment
          ? <td>NADA</td>
          : (
            Object.keys(investment).map((column, index) => {
              if (ignoredColumns.includes(column)) return null
              if (column === 'ammount') {
                investment[column] = investment[column].toLocaleString('es')
              }
              let dynamicClass = investmentsTableStyler[column].class

              if (column === 'coin_value') {
                try {
                  if (investment[column] > orderedCoinsData[investment.coin].price) {
                    dynamicClass = dynamicClass.replace('profitCell', '')
                  }
                } catch {
                  console.log('Error')
                }
              }
              return (
                <td key={index} className={dynamicClass}>
                  {investment[column]}
                </td>
              )
            }))
      }
    </tr>
  )
}
