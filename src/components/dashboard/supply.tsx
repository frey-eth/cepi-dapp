'use client'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import Table from '../common/table/index'

import useColumnsSupply from '@/data/column/columns-supply'
import { supplyData } from '@/data/supply/supply-data'

const Supply = () => {
  const { columns } = useColumnsSupply()

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <div className='relative flex h-[340px]  w-full flex-col  gap-4 overflow-y-auto rounded-lg  border border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:border-[#252B3D26]'>
      <Image src={bgAssets} alt='background' fill />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-[20px] font-medium leading-5 text-white'>Your Supplies</div>
        <div className='flex h-[26px] w-full flex-row items-center gap-1 leading-[14px] max-sm:justify-between min-[320px]:flex-wrap min-[375px]:flex-nowrap min-[375px]:gap-[6px] min-[414px]:gap-2 md:gap-2'>
          <div className='flex h-[26px] flex-row  items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
            <span className=' font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              Balance
            </span>
            <span className=' font-medium leading-4 text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              $3.31
            </span>
          </div>
          <div className='flex h-[26px] flex-row  items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
            <span className='font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              APY
            </span>
            <span className=' font-medium leading-4 text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              2.16%
            </span>
          </div>
          <div className='flex h-[26px]  flex-row items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
            <span className='font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              Collateral
            </span>
            <span className=' font-medium leading-4 text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              $3.31
            </span>
          </div>
        </div>
        <div className='table-custom h-[270px] w-full md:overflow-y-auto'>
          <Table className='w-full' columns={columns} data={supplyData} sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
    </div>
  )
}

export default Supply
