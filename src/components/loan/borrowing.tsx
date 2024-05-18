'use client'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import useColumnsBorrow from '@/data/column/columns-borrow-loan'
import { dataBorrow } from '@/data/global-pool/global-pool-data'
import tooltipBorrowData from '@/data/tooltip/tooltip-borrow.json'
// import BorrowModal from '../common/modal/borrow-modal'

const Borrowing = () => {
  const { columnsBorrow } = useColumnsBorrow()

  return (
    <>
      <Table
        hasResponsive
        columns={columnsBorrow}
        data={dataBorrow}
        className='custom-table relative w-[1000px] lg:w-full'
      />
      {/* <BorrowModal {...modalPropsBorrowing} /> */}
      {tooltipBorrowData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Borrowing
