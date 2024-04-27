import investments from '#/investments.json'
import { InvestmentsTable } from '#/components/InvestmentsTable'
import { Coins } from '#/components/Coins'
import { useGetValues } from '#/hooks/prices.jsx'
import { useEffect, useState } from 'react'

function totalizeTokens () {
  const ammountPerToken = {}

  for (const investment of investments) {
    investment.coin in ammountPerToken
      ? ammountPerToken[investment.coin] += investment.coin_ammount
      : ammountPerToken[investment.coin] = investment.coin_ammount
  }

  return ammountPerToken
}

export function InvestmentsSection ({ config }) {
  const [coinsData, setCoinsData] = useState([])
  const coins = investments.map(investment => investment.coin)

  // const coinsData = useGetValues(coins)
  // console.log(coinsData)
  useEffect(() => {
    const coinsD = [
      {
        id: 'binancecoin',
        symbol: 'BNB',
        price: 603.73,
        name: 'BNB'
      },
      {
        id: 'bitcoin',
        symbol: 'BTC',
        price: 66401,
        name: 'Bitcoin'
      },
      {
        id: 'cardano',
        symbol: 'ADA',
        price: 0.510395,
        name: 'Cardano'
      },
      {
        id: 'chainlink',
        symbol: 'LINK',
        price: 15.49,
        name: 'Chainlink'
      },
      {
        id: 'ethereum',
        symbol: 'ETH',
        price: 3190.72,
        name: 'Ethereum'
      },
      {
        id: 'litecoin',
        symbol: 'LTC',
        price: 84.69,
        name: 'Litecoin'
      },
      {
        id: 'nexo',
        symbol: 'NEXO',
        price: 1.27,
        name: 'Nexo'
      },
      {
        id: 'polkadot',
        symbol: 'DOT',
        price: 7.41,
        name: 'Polkadot'
      },
      {
        id: 'ripple',
        symbol: 'XRP',
        price: 0.548977,
        name: 'XRP'
      },
      {
        id: 'solana',
        symbol: 'SOL',
        price: 155.92,
        name: 'Solana'
      }
    ]
    setCoinsData(coinsD)
  }, [])

  return (
    <>
      <Coins
        coins={coins}
        coinsData={coinsData}
        ammountPerToken={totalizeTokens()} />
      <InvestmentsTable
        investments={investments}
        ignoredColumns={config.ignoredColumns}
        coinsData={coinsData}/>
    </>
  )
}
