'use client'
import { getDataColumnsBorrowDashboard } from '@/data/column/columns-borrow-dashboard'
import { borrowData } from '@/data/supply/supply-data'

import bgAssets from '@/images/table/bg-table.svg'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'

import Table from '../common/table'
import TopInformation from '../common/top-information'
import { DataModalType } from '@/types/modal'
import { ISupply, Type } from '@/types/table'
const ModalRepay = dynamic(() => import('../common/modal/repay'), {
  ssr: false,
})
const Borrow = () => {
  const [sorting, setSorting] = useState<SortingState>([])

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const onClickRepay = useCallback(({ data, type }: { data: ISupply; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])

  const columnsData = useMemo(() => getDataColumnsBorrowDashboard({ onClickRepay }), [onClickRepay])

  return (
    <div className='relative flex h-[250px] w-full  flex-col gap-4  overflow-y-auto rounded-lg border  border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:h-[340px] md:border-[#252B3D26]'>
      <Image src={bgAssets} alt='background' fill objectFit='cover' />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-[20px] font-medium leading-5 text-white'>Your Borrows</div>

        <div className='flex h-[26px] w-full flex-row flex-wrap items-center gap-1 leading-[14px]  min-[320px]:flex-wrap  min-[375px]:gap-[6px] min-[414px]:gap-2 md:gap-2'>
          <TopInformation title='Balance' value='$19.99' />
          <TopInformation title='APY' value='5.47%' tooltip_id='borrow_apy' tooltip_content='' />
          <TopInformation title='Borrow power used' value='11.24%' tooltip_id='borrow_power' tooltip_content='' />
        </div>
        <div className='table-custom mb-[2px] mt-6 h-[270px] w-full md:mt-0 md:overflow-y-auto'>
          <Table className='w-full' columns={columnsData} data={borrowData} sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
      {isOpen && <ModalRepay isOpen={isOpen} data={data} setIsOpen={setIsOpen} type='repay' />}
    </div>
  )
}

export default Borrow
