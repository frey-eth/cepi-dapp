'use client'
import Image from 'next/image'
import React from 'react'
import arrow_back from '@/icons/details/arrowback.svg'
import ic_share from '@/icons/details/share.svg'
import ic_wallet from '@/icons/details/wallet.svg'

import { dataBorrow } from '@/data/asset-borrow/asset-borrow'

const data = dataBorrow[0]

const ViewDetail = () => {
  return (
    <div className='text-white'>
      <div className='flex flex-col gap-6'>
        <div className='flex h-8 flex-row gap-4'>
          <button className='flex flex-row items-center gap-[6px] rounded-lg bg-[#FFFFFF1A] p-2'>
            <div className='h-4 w-4'>
              <Image src={arrow_back} alt='back' />
            </div>
            Go back
          </button>
          <div className='flex flex-row items-center gap-2'>
            <div className='h-6 w-6'>
              <Image src={data.asset.icon} alt='icon' objectFit='cover' />
            </div>
            {data.asset.name}
          </div>
        </div>

        <div className='flex h-[46px] flex-row items-center gap-6'>
          <div className='h-[46px] w-[46px] '>
            <Image src={data.asset.icon} alt='icon' className='h-[46px] w-[46px] object-cover' />
          </div>
          <div className='flex h-full flex-col gap-[6px] font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
            USDC
            <div className='flex flex-row items-center gap-2 text-[20px] leading-[20px] text-white'>
              USDC
              <div className='flex flex-row items-center gap-2'>
                <div className='flex h-6 w-6 items-center justify-center gap-[10px] overflow-hidden rounded-full bg-[#FFFFFF1A] p-[1px]'>
                  <Image src={ic_share} alt='share' objectFit='cover' />
                </div>
                <div className='flex h-6 w-6 items-center justify-center gap-[10px] overflow-hidden rounded-full bg-[#FFFFFF1A] p-[1px]'>
                  <Image src={ic_wallet} alt='share' objectFit='cover' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetail
