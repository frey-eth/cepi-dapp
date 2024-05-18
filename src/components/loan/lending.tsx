'use client'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import useColumnsLend from '@/data/column/columns-lend-loan'
import { data } from '@/data/global-pool/global-pool-data'
import tooltipData from '@/data/tooltip/tooltip.json'
// import BorrowModal from '../common/modal/borrow-modal'

const Lending = () => {
  const { columns } = useColumnsLend()

  return (
    <>
      <Table hasResponsive columns={columns} data={data} className='custom-table relative w-[1000px] lg:w-full' />
      {/* <BorrowModal {...modalProps} /> */}
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Lending
