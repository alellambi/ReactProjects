// import tokenIds from '#/tokenIds.json'
// import mockResults from '#/mock_results.json'
import { useEffect, useState } from 'react'
import cachedTokens from '#/cachedTokens.json'

async function getTokenIds (coins) {
  // const symbols = await tokenIds.filter(token => coins.includes(token.name))

  const ids = []
  coins.forEach(token => {
    ids.push(cachedTokens[token].id)
  })
  return ids
}

async function getValues (coins) {
  const options = {
    params: {
      ids: `${coins.join(',')}`,
      vs_currencies: 'usd'
    },
    headers: {
      'X-RapidAPI-Key': '56f48ed56fmsh92a9560f0dacfd6p143fb9jsnfbdde24a4f8a',
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
    }
  }
  // return mockResults
  return await fetch(`https://coingecko.p.rapidapi.com/simple/price?ids=${coins}&vs_currencies=usd`, options)
    .then(res => res.json())
    .then(json => {
      return json
    })
}

export function useGetValues (coins) {
  const [values, setValues] = useState([])

  useEffect(() => {
    getTokenIds(coins)
      .then((res) => {
        getValues(res)
          .then((prices) => {
            const responseTokens = []

            for (const tokenData in prices) {
              for (const tokenStored in cachedTokens) {
                if (cachedTokens[tokenStored].id === tokenData) {
                  cachedTokens[tokenStored].name = tokenStored
                  cachedTokens[tokenStored].price = prices[tokenData].usd
                  responseTokens.push(cachedTokens[tokenStored])
                }
              }
            }
            setValues(responseTokens)
          })
      })
  }, [])

  return values
}
