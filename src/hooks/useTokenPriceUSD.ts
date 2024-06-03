import { useEffect, useState } from 'react'

interface PriceData {
  price: string
  expo: number
}

interface TokenPrice {
  id: string
  price: PriceData
}

const useTokenPrices = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    SOL: 0,
    BONK: 0,
  })

  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        const response = await fetch(
          'https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d&ids%5B%5D=0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419'
        )
        const data = await response.json()

        const tokenPrices = data.parsed.reduce((acc: { [key: string]: number }, token: TokenPrice) => {
          const { id, price } = token
          let symbol = ''

          if (id === 'ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d') {
            symbol = 'SOL'
          } else if (id === '72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419') {
            symbol = 'BONK'
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
