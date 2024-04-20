import './App.css'

import investments from '#/investments.json'
import config from '#/config.json'
import { Investments } from './components/Investments'
import { Coins } from './components/Coins'

function App () {
  function totalizeTokens () {
    const ammountPerToken = {}

    for (const investment of investments) {
      investment.coin in ammountPerToken
        ? ammountPerToken[investment.coin] += investment.coin_ammount
        : ammountPerToken[investment.coin] = investment.coin_ammount
    }

    return ammountPerToken
  }

  const ignoredColumns = config.ignoredColumns

  const coins = investments.map(investment => investment.coin)
  const ammountPerToken = totalizeTokens()

  return (
    <>
      <Coins coins={coins} ammountPerToken={ammountPerToken} />
      <Investments
        investments={investments}
        ignoredColumns={ignoredColumns}/>
    </>
  )
}

export default App
