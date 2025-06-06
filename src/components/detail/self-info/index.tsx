'use client'
import { default as BtnBorrow, default as BtnMain } from '@/components/common/button/btn-main'
import { useBalance } from '@/hooks/useBalance'
import useTokenPrices from '@/hooks/useTokenPriceUSD'
import ic_wallet from '@/icons/details/wallet.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import { DataModalType } from '@/types/modal'
import { AssetsBorrow } from '@/types/table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

const SupplyModal = dynamic(() => import('../../common/modal/supply'), { ssr: false })
const SelfInformation = ({ data }: { data: AssetsBorrow }) => {
  const { balance } = useBalance(data?.addressToken)

  const prices = useTokenPrices()
  const [openSupply, setOpenSupply] = useState(false)

  const modalData: DataModalType = {
    data: data,
    type: 'supply',
  }
  return (
    <div className='flex h-fit w-full flex-col gap-6 rounded-2xl bg-[#0B0D10CC] p-6 font-helveticaNeue lg:max-w-sm'>
      <h3 className='text-[16px] font-medium leading-[16px]'>Your info</h3>
      <div className='flex flex-col gap-6'>
        <div className='flex h-10 flex-row gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#43434352] bg-[#FFFFFF1A]'>
            <Image src={ic_wallet} alt='wallet' objectFit='cover' className='h-6 w-6' />
          </div>

          <div className='flex flex-col gap-2 font-helveticaNeue text-[14px] font-light leading-[14px]'>
            Wallet balance
            <p className=' flex flex-row gap-[6px] text-[16px] font-medium leading-[16px] text-[#A5A5B5]'>
              <span className='text-white'>{balance}</span>
              {data.asset.name}
            </p>
          </div>
        </div>

        <div className='w-full border border-[#43434352]' />

        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-[16px]'>
            <div className='flex h-[58px] w-full flex-row items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px]'>
                  Available to supply <Image src={icAlert} alt='icon alert' sizes='16' id='available_supply' />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <div className='flex flex-row items-center gap-[6px] text-[16px] font-semibold leading-[16px] text-[#A5A5B5]'>
                    <span className='text-white'>{balance}</span> {data.asset.name}
                  </div>
                  <p className='flex flex-row text-[12px] leading-[12px] text-[#A5A5B5]'>
                    $ {isNaN(prices[data.asset.name] * balance) ? 0 : (prices[data.asset.name] * balance).toFixed(8)}
                  </p>
                </div>
              </div>
              <BtnMain
                title='Supply'
                className={`${balance == 0 && 'opacity-50'}`}
                disabled={balance == 0}
                onClick={() => {
                  setOpenSupply(true)
                }}
              />
            </div>

            <div className='flex h-[58px] w-full flex-row items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px]'>
                  Available to borrow <Image src={icAlert} alt='icon alert' sizes='16' id='available_borrow' />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <div className='flex flex-row items-center gap-[6px] text-[16px] font-semibold leading-[16px] text-[#A5A5B5]'>
                    <span className='text-white'>0</span> {data?.asset.name}
                  </div>
                  <p className='flex flex-row text-[12px] leading-[12px] text-[#A5A5B5]'>$ 0</p>
                </div>
              </div>
              <BtnBorrow title='Borrow' className={`opacity-50`} />
            </div>
          </div>

          {balance == 0 && (
            <div className=' gap-[10px] rounded-md bg-[#BF83491A] p-2 font-helveticaNeue text-[12px] font-normal leading-[14px] text-[#FFC53D]'>
              Your Solana wallet is empty. Purchase or transfer assets.
            </div>
          )}
        </div>
      </div>
      {openSupply && <SupplyModal isOpen={openSupply} setIsOpen={setOpenSupply} data={modalData} />}
    </div>
  )
}

export default SelfInformation
