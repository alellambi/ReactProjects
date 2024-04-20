export function Investments ({ investments, ignoredColumns }) {
  const tableStyler =
  {
    date: { name: 'Fecha', class: 'dateCell' },
    ammount: { name: 'Pesos', class: 'pesosCell' },
    usd: { name: 'Dolares', class: 'dollarCell' },
    final_ammount: { name: 'Dolares Invertidos', class: 'dollarCell' },
    coin: { name: 'Token', class: '' },
    coin_ammount: { name: 'Cant. Tokens', class: '' },
    int_rate: { name: 'Intereses Anuales', class: 'percentageCell' },
    valor_token: { name: 'Valor de Token', class: '' },
    token_earn: { name: 'Tokens Generados', class: '' },
    total_tokens: { name: 'Tokens Totales', class: '' },
    int_earn: { name: 'USD Generados', class: 'dollarCell' }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {
              Object.keys(investments[0]).map((investment) => {
                // if (investment === 'uuid') return null
                if (ignoredColumns.includes(investment)) return null
                return (
                  <th key={investment}>
                    {tableStyler[investment].name}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            investments.map((investment) => {
              return (
                <tr key={investment.uuid}>
                  {
                  Object.keys(investment).map((column, index) => {
                    if (ignoredColumns.includes(column)) return null
                    if (column === 'date') {
                      investment[column] = new Date(investment[column]).toLocaleDateString()
                    }
                    if (column === 'ammount') {
                      investment[column] = investment[column].toLocaleString('es')
                    }
                    const dynamicClass = tableStyler[column].class

                    return (
                      <td key={index} className={dynamicClass}>
                        {investment[column]}
                      </td>
                    )
                  })
            }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}
