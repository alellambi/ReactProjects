import { orderBy } from "#/handlers/tableHandlers.js"
import { useEffect, useState } from "react"
import { CoinRow } from "./CoinRow"

export function Coins ({ coins, coinsTableStyler, coinsData, ammountPerToken }) {
  const [orderedCoinsData, setOrderedCoinsData] = useState(coinsData)
  useEffect(() => {
    setOrderedCoinsData(coinsData)
  }, [coinsData])

  function handleClick (e) {
    
    const newData = orderBy(e, orderedCoinsData)
    setOrderedCoinsData(newData)
  }

  return (
    <table>
      <thead>
        <tr>
        {
              Object.keys(coinsTableStyler)?.map((investmentHeader) => {
                return (
                  <th key={investmentHeader} id={investmentHeader} onClick={handleClick}>
                    {coinsTableStyler[investmentHeader].name}
                  </th>
                )
              })
            }
        </tr>
      </thead>
      <tbody>
        {
          orderedCoinsData.length > 0
            ? (
              orderedCoinsData.map((coin) => {
                  return (
                    <CoinRow key={coin.id}
                      coin={coin}
                      coinsTableStyler={coinsTableStyler}
                      ammountPerToken={ammountPerToken}
                    />
                  )
                }))
            : (<tr><td>NADA</td></tr>)
        }
      </tbody>
    </table>
  )
}
