'use client'
import bgAssets from '@/images/table/bg-table.svg'
import { SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import Table from '../common/table/index'

import { getDataColumnsWithdraw } from '@/data/column/columns-supply-dashboard'
import { supplyData } from '@/data/supply/supply-data'
import dynamic from 'next/dynamic'

import TopInformation from '../common/top-information'
import { DataModalType } from '@/types/modal'
import { ISupply, Type } from '@/types/table'

const ModalWithdraw = dynamic(() => import('../common/modal/withdraw'), {
  ssr: false,
})

const Supply = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const onClickWithdraw = useCallback(({ data, type }: { data: ISupply; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])
  const columnsData = useMemo(() => getDataColumnsWithdraw({ onClickWithdraw }), [onClickWithdraw])

  return (
    <div className='relative flex h-[340px]  w-full flex-col  gap-4 overflow-y-auto rounded-lg  border border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:border-[#252B3D26]'>
      <Image src={bgAssets} alt='background' fill objectFit='cover' />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-[20px] font-medium leading-5 text-white'>Your Supplies</div>
        <div className='flex h-[26px] w-full flex-row items-center gap-1 leading-[14px] max-sm:justify-between min-[320px]:flex-wrap min-[375px]:flex-nowrap min-[375px]:gap-[6px] min-[414px]:gap-2 md:gap-2'>
          <TopInformation title='Balance' value='$3.31' />
          <TopInformation title='APY' value='2.16%' />
          <TopInformation title='Collateral' value='$3.31' />
        </div>
        <div className='table-custom h-[270px] w-full md:overflow-y-auto'>
          <Table className='w-full' columns={columnsData} data={supplyData} sorting={sorting} setSorting={setSorting} />
        </div>
      </div>
      {isOpen && <ModalWithdraw isOpen={isOpen} data={data} setIsOpen={setIsOpen} type='withdraw' />}
    </div>
  )
}

export default Supply
