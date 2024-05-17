'use client'
import Filter from '@/components/common/filter'
import { Modal } from '@/components/common/modal'
import Table from '@/components/common/table'
import { useState } from 'react'

import CustomTooltip from '@/components/common/tooltip'
import useColumnsBorrow from '@/data/column/columns-borrow-loan'
import useColumnsLend from '@/data/column/columns-lend-loan'
import { data, dataBorrow } from '@/data/global-pool/global-pool-data'
import tooltipBorrowData from '@/data/tooltip/tooltip-borrow.json'
import tooltipData from '@/data/tooltip/tooltip.json'
const Loans = () => {
  const { columnsBorrow, modalPropsBorrowing } = useColumnsBorrow()
  const { columns, modalPropsLending } = useColumnsLend()

  const [selectAction, setSelectAction] = useState('Lend')

  return (
    <main className='mx-auto h-full w-full  p-4 pt-10  lg:w-[1288px]'>
      <div className='h-full w-full   lg:min-h-[728px]'>
        <section className='table-custom relative overflow-y-hidden rounded-[16px] border border-solid border-[#43434352] bg-[rgba(255,255,255,0.06)] min-[315px]:h-[450px] min-[320px]:p-4 min-[375px]:h-[380px] min-[375px]:p-2 min-[414px]:h-[400px] min-[414px]:p-4 md:h-[398px] md:overflow-hidden  md:rounded-2xl md:border-none md:p-6'>
          <div className='backdrop absolute inset-0 rounded-2xl'></div>
          <div className='relative flex flex-col gap-4 md:gap-0'>
            <Filter selectAction={selectAction} setSelectAction={setSelectAction} />
            <div>
              <span className='block text-2xl font-medium text-[#FFF] md:my-4'>Global Pool</span>

              <div className='table-custom h-[236px] w-full overflow-y-auto'>
                {selectAction === 'Lend' ? (
                  <Table
                    hasResponsive
                    columns={columns}
                    data={data}
                    className=' custom-table relative w-[1000px] lg:w-full'
                  />
                ) : (
                  <Table
                    hasResponsive
                    columns={columnsBorrow}
                    data={dataBorrow}
                    className=' custom-table relative w-[1000px] lg:w-full'
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {selectAction === 'Lend' ? <Modal {...modalPropsLending} /> : <Modal {...modalPropsBorrowing} />}

      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
      {tooltipBorrowData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </main>
  )
}

export default Loans
