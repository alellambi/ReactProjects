export function CoinRow ({coin, coinsTableStyler, ammountPerToken}) {
  return (
    <tr>
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
}