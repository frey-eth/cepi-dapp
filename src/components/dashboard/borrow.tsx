'use client'
import { getDataColumnsBorrowDashboard } from '@/data/column/columns-borrow-dashboard'
import { nonSupplyData } from '@/data/supply/supply-data'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { ISupply, Type } from '../../../types/table'
import Table from '../common/table'
const ModalWithdraw = dynamic(() => import('../common/modal/withdraw'), {
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
    <div className='relative flex h-[220px] w-full  flex-col gap-4  overflow-y-auto rounded-lg border  border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:h-[340px] md:border-[#252B3D26]'>
      <Image src={bgAssets} alt='background' fill />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-[20px] font-medium leading-5 text-white'>Your Borrows</div>
        <div className='h-[30px] text-[14px] font-normal leading-[14px] text-[#C6C6C6]'>Nothing borrowed yet</div>
        <div className='table-custom h-[270px] w-full md:overflow-y-auto'>
          <Table
            className='w-full'
            columns={columnsData}
            data={nonSupplyData}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>
      </div>
      {isOpen && <ModalWithdraw isOpen={isOpen} data={data} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default Borrow
