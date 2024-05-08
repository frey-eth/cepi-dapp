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
      className='w-[140px] cursor-pointer rounded-lg bg-gradient-connect px-2 py-2 text-center text-base text-[#000000] md:w-[161px] md:px-4'
    >
      {publicKey ? addressFormatter(publicKey.toBase58() as string) : 'Connect Wallet'}
    </div>
  )
}

export default BtnConnect
