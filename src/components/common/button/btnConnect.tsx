'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { addressFormatter } from '../../../../utils/libs/fortmat'

const BtnConnect = () => {
  const { setVisible } = useWalletModal()
  const { publicKey, disconnect } = useWallet()
  const connect = () => {
    if (publicKey) {
      disconnect()
      return
    }
    setVisible(true)
  }

  return (
    <div
      onClick={connect}
      className='w-[161px] cursor-pointer rounded-lg bg-gradient-connect px-4 py-2 text-center text-base text-[#fff]'
    >
      {publicKey ? addressFormatter(publicKey.toBase58() as string) : 'Connect Wallet'}
    </div>
  )
}

export default BtnConnect
