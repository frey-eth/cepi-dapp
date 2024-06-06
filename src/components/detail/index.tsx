'use client'
import arrow_back from '@/icons/details/arrowback.svg'
import ic_share from '@/icons/details/share.svg'
import ic_wallet from '@/icons/details/wallet.svg'
import Image from 'next/image'

import { dataBorrow } from '@/data/asset-borrow/asset-borrow'
import { useEffect, useState } from 'react'
import TotalDetails from './total-details'

import tooltipDetailsData from '@/data/tooltip/details.json'
import useUrlParams from '@/hooks/useSearchParams'
import { AssetsBorrow } from '@/types/table'
import Link from 'next/link'
import CustomTooltip from '../common/tooltip'
import TopInfo from './common/top-info'
import SelfInformation from './self-info'

const ViewDetail = () => {
  const [data, setData] = useState<AssetsBorrow>(dataBorrow[0])
  const { query } = useUrlParams()
  useEffect(() => {
    if (query('asset')) {
      const assetName = query('asset')
      const asset = dataBorrow.find((item) => item.asset.name === assetName)
      if (asset) setData(asset)
    }
  }, [query])

  return (
    <div className='flex flex-col gap-10 font-helveticaNeue text-white'>
      <div className='flex flex-col gap-6'>
        <div className='flex h-8 flex-row gap-4'>
          <Link
            href={'/'}
            className='flex flex-row items-center gap-[6px] rounded-lg bg-[#FFFFFF1A] p-2 text-[14px] leading-[14px]'
          >
            <div className='h-4 w-4'>
              <Image src={arrow_back} alt='back' />
            </div>
            Go back
          </Link>
          <div className='flex flex-row items-center gap-2 text-[14px] font-medium leading-[14px]'>
            <div className='h-6 w-6'>
              <Image src={data.asset.icon} alt='icon' objectFit='cover' />
            </div>
            {data.asset.name}
          </div>
        </div>

        <div className='flex flex-row items-center gap-10 max-sm:flex-col max-sm:items-start sm:h-[46px]'>
          <div className='flex h-full flex-row items-center gap-6'>
            <div className='h-[46px] w-[46px] '>
              <Image src={data.asset.icon} alt='icon' className='h-[46px] w-[46px] object-cover' />
            </div>
            <div className='flex h-full flex-col gap-[6px] font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
              {data.asset.name}
              <div className='flex flex-row items-center gap-2 text-[20px] leading-[20px] text-white'>
                {data.asset.name}
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

          <div className='h-full border border-[#FFFFFF1A] max-sm:hidden' />

          <div className='flex flex-wrap items-center gap-6 whitespace-nowrap font-helveticaNeue'>
            <TopInfo title='Reserve Size' symbol='$' value='3.36B' />
            <TopInfo title='Available liquidity' symbol='$' value='63.06M' />
            <TopInfo title='Utilization Rate' symbol='%' value='0.66' />
            <TopInfo title='Oracle price' symbol='$' value='3.36B' link='#' />
          </div>
        </div>
      </div>

      <div className='flex w-full flex-row gap-4 max-[1024px]:flex-col-reverse'>
        <TotalDetails />
        <SelfInformation data={data} />
      </div>

      {tooltipDetailsData.map((item, index) => (
        <CustomTooltip key={index} id={item.id} content={item.content} />
      ))}
    </div>
  )
}

export default ViewDetail
