'use client'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import { getDataColumnsBorrowing } from '@/data/column/columns-borrow-loan'
import { dataBorrow } from '@/data/global-pool/global-pool-data'
import tooltipBorrowData from '@/data/tooltip/tooltip-borrow.json'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { GlobalPoolBorrow, Type } from '../../../types/table'

const ModalBorrow = dynamic(() => import('../common/modal/borrow-modal'), {
  ssr: false,
})
const Borrowing = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const onClickBorrow = useCallback(({ data, type }: { data: GlobalPoolBorrow; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])

  const columnsData = useMemo(() => getDataColumnsBorrowing({ onClickBorrow }), [onClickBorrow])

  return (
    <>
      <Table
        hasResponsive
        columns={columnsData}
        data={dataBorrow}
        className='custom-table relative w-[1000px] lg:w-full'
      />
      {isOpen && <ModalBorrow isOpen={isOpen} data={data} setIsOpen={setIsOpen} />}
      {tooltipBorrowData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Borrowing
