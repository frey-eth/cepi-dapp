import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'

export function useBalance(tokenAddress?: string) {
  const [balance, setBalance] = useState(0)

  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (tokenAddress) {
      fetchTokenBalance()
    } else {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, tokenAddress])

  const fetchBalance = async () => {
    if (publicKey) {
      const lamports = await connection.getBalance(publicKey)
      setBalance(lamports / LAMPORTS_PER_SOL)
    }
  }

  const fetchTokenBalance = async () => {
    if (tokenAddress && publicKey) {
      const tokenAccountPublicKey = new PublicKey(tokenAddress)
      try {
        const balanceInfo = (await connection.getTokenAccountBalance(tokenAccountPublicKey)) || 0
        setBalance(parseFloat(balanceInfo.value.amount) / LAMPORTS_PER_SOL)
      } catch (error) {
        console.log('LOG: ERROR', error)
      }
    }
  }

  return useMemo(() => {
    return {
      balance,
    }
  }, [balance])
}
