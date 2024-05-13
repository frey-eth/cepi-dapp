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
      className={`${publicKey ? 'min-[320px]:text-[12px]' : 'min-[320px]:text-[14px]'} flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-gradient-connect px-2  py-2 text-center font-helveticaNeue text-base text-[#000000]  max-sm:w-[100px] min-[375px]:w-[140px] min-[375px]:text-[14px] md:w-[161px] md:px-4
      `}
    >
      {publicKey ? addressFormatter(publicKey.toBase58() as string) : 'Connect '}
      {!publicKey && <span className='hidden min-[375px]:flex'>Wallet</span>}
    </div>
  )
}

export default BtnConnect
