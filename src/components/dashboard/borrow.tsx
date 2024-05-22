'use client'
import bgAssets from '@/images/table/bg-table.svg'
import { SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import Table from '../common/table/index'

import useColumnsSupply from '@/data/column/columns-supply'
import { nonSupplyData } from '@/data/supply/supply-data'

const Borrow = () => {
  const { columns } = useColumnsSupply()
  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <div className='relative flex h-[220px] w-full  flex-col gap-4  overflow-y-auto rounded-lg border  border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:h-[340px] md:border-[#252B3D26]'>
      <Image src={bgAssets} alt='background' fill objectFit='cover' />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-[20px] font-medium leading-5 text-white'>Your Borrows</div>
        <div className='h-[30px] text-[14px] font-normal leading-[14px] text-[#C6C6C6]'>Nothing borrowed yet</div>
        <div className='table-custom h-[270px] w-full md:overflow-y-auto'>
          <Table className='w-full' columns={columns} data={nonSupplyData} sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
    </div>
  )
}

export default Borrow
