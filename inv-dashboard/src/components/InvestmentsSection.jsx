import investments from '#/data/investments.json'
import { InvestmentsTable } from '#/components/InvestmentsTable'
import { Coins } from '#/components/Coins'
import { UseGetValues } from '#/hooks/prices.jsx'

function totalizeTokens () {
  const ammountPerToken = {}

  for (const investment of investments) {
    investment.coin in ammountPerToken
      ? ammountPerToken[investment.coin] += investment.coin_ammount
      : ammountPerToken[investment.coin] = investment.coin_ammount
  }

  return ammountPerToken
}

const coins = investments.map(investment => investment.coin)

export function InvestmentsSection ({ config }) {
  const coinsData = UseGetValues(coins)


  return (
    <>
      <Coins
        coins={coins}
        coinsData={coinsData}
        ignoredColumns={config.coinsIgnoredColumns}
        coinsTableStyler={config.coinsTableStyler}
        ammountPerToken={totalizeTokens()} />

      <InvestmentsTable
        investments={investments}
        ignoredColumns={config.investmentsIgnoredColumns}
        investmentsTableStyler={config.investmentsTableStyler}
        coinsData={coinsData}/>
    </>
  )
}
