import { useGetValues } from '#/hooks/prices.jsx'

export function Coins ({ coins, ammountPerToken }) {
  const coinsData = useGetValues(coins)

  return (
    <table>
      <thead>
        <tr>
          <th>
            Token
          </th>
          <th>
            Value
          </th>
          <th>
            Total Tokens
          </th>
          <th>
            Total Value
          </th>
        </tr>
      </thead>
      <tbody>
        {
          coinsData.length > 0
            ? (
                coinsData.map((coin, index) => {
                  return (
              <tr key={coin.id}>
                <td>
                  {coin.symbol}
                </td>
                <td className='dollarCell'>
                  {coin.price.toLocaleString('es', { useGrouping: true })}
                </td>
                <td>
                  {ammountPerToken[coin.name]}
                </td>
                <td className='dollarCell'>
                  {(coin.price * ammountPerToken[coin.name]).toFixed(2)}
                </td>
              </tr>
                  )
                }))
            : (<tr><td>NADA</td></tr>)
        }
      </tbody>
    </table>
  )
}
