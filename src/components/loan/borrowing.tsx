'use client'
import { Modal } from '@/components/common/modal'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import useColumnsBorrow from '@/data/column/columns-borrow-loan'
import { dataBorrow } from '@/data/global-pool/global-pool-data'
import tooltipBorrowData from '@/data/tooltip/tooltip-borrow.json'

const Borrowing = () => {
  const { columnsBorrow, modalPropsBorrowing } = useColumnsBorrow()

  return (
    <>
      <Table
        hasResponsive
        columns={columnsBorrow}
        data={dataBorrow}
        className='custom-table relative w-[1000px] lg:w-full'
      />
      <Modal {...modalPropsBorrowing} />
      {tooltipBorrowData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Borrowing
