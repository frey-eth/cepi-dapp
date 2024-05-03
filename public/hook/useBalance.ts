import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'

export function useBalance(token_address?: string) {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (token_address) {
      fetchTokenBalance()
    } else {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, token_address])

  const fetchBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    }
  }
  const fetchTokenBalance = async () => {
    if (token_address && publicKey) {
      const balance = await connection.getTokenAccountBalance(new PublicKey(token_address))
      setBalance((balance as any) / LAMPORTS_PER_SOL)
    }
  }

  return useMemo(() => {
    return {
      balance,
      address,
      setAddress,
    }
  }, [balance])
}
