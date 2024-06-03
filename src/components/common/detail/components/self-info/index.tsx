import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnSupply from '@/components/common/button/btn-supply'
import { useBalance } from '@/hooks/useBalance'
import ic_wallet from '@/icons/details/wallet.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import { AssetsBorrow } from '@/types/table'

import Image from 'next/image'

const SelfInfomation = ({ data }: { data?: AssetsBorrow }) => {
  const { balance } = useBalance()
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
              {data?.asset.name}
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
                    <span className='text-white'>0</span> {data?.asset.name}
                  </div>
                  <p className='flex flex-row text-[12px] leading-[12px] text-[#A5A5B5]'>$ 0</p>
                </div>
              </div>
              <BtnSupply className=' opacity-50' />
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
              <BtnBorrow className=' opacity-50' />
            </div>
          </div>

          {balance == 0 && (
            <div className=' gap-[10px] rounded-md bg-[#BF83491A] p-2 font-helveticaNeue text-[12px] font-normal leading-[14px] text-[#FFC53D]'>
              Your Solana wallet is empty. Purchase or transfer assets.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelfInfomation
