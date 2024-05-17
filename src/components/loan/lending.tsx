'use client'
import { Modal } from '@/components/common/modal'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import useColumnsLend from '@/data/column/columns-lend-loan'
import { data } from '@/data/global-pool/global-pool-data'
import tooltipData from '@/data/tooltip/tooltip.json'

const Lending = () => {
  const { columns, modalProps } = useColumnsLend()

  return (
    <>
      <Table hasResponsive columns={columns} data={data} className='custom-table relative w-[1000px] lg:w-full' />
      <Modal {...modalProps} />
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Lending
