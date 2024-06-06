import { useEffect, useState } from 'react'

interface PriceData {
  price: string
  expo: number
}

interface TokenPrice {
  id: string
  price: PriceData
}

const solAddressToken = '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d'
const bonkAddressToken = '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419'
const usdcAddressToken = '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a'

const useTokenPrices = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    SOL: 0,
    BONK: 0,
    USDC: 0,
  })

  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        const response = await fetch(
          `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${solAddressToken}&ids%5B%5D=${bonkAddressToken}&ids%5B%5D=${usdcAddressToken}`
        )
        const data = await response.json()

        const tokenPrices = data.parsed.reduce((acc: { [key: string]: number }, token: TokenPrice) => {
          const { id, price } = token
          let symbol = ''

          if (id === solAddressToken.replace(/^0x/, '')) {
            symbol = 'SOL'
          } else if (id === bonkAddressToken.replace(/^0x/, '')) {
            symbol = 'BONK'
          } else if (id === usdcAddressToken.replace(/^0x/, '')) {
            symbol = 'USDC'
          }

          if (symbol) {
            acc[symbol] = parseFloat(price.price) * Math.pow(10, price.expo)
          }

          return acc
        }, {})

        setPrices(tokenPrices)
      } catch (error) {
        console.error('Error fetching token prices:', error)
      }
    }

    fetchTokenPrices()
  }, [])

  return prices
}

export default useTokenPrices
