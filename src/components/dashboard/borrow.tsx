'use client'
import { getDataColumnsBorrowDashboard } from '@/data/column/columns-borrow-dashboard'
import { borrowData } from '@/data/supply/supply-data'

import icAlert from '@/images/table/alert-circle-light.svg'
import bgAssets from '@/images/table/bg-table.svg'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { ISupply, Type } from '../../../types/table'
import Table from '../common/table'
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
          <div className='flex h-[26px] flex-row  items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
            <span className=' font-medium leading-[14px] text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              Balance
            </span>
            <span className=' font-medium leading-[14px] text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              $19.99
            </span>
          </div>
          <div className='flex h-[26px] flex-row items-center  justify-center rounded border border-[#3C3937] px-2 pb-[1px] leading-[14px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
            <span className='font-medium leading-[14px] text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              APY
            </span>
            <span className=' font-medium leading-[14px] text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              5.47%
            </span>
            <Image src={icAlert} alt='icAlert' width={14} height={14} className='mb-[1px]' />
          </div>
          <div className='flex h-[26px] flex-row items-center  justify-center gap-x-[10px] rounded border border-[#3C3937] px-2 pb-[1px]   leading-[14px]'>
            <span className='font-medium leading-[14px] text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
              Borrow power used
            </span>
            <span className=' font-medium leading-[14px] text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
              11.24%
            </span>
            <Image src={icAlert} alt='icAlert' width={14} height={14} className='mb-[1px]' />
          </div>
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
