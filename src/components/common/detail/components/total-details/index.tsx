'use client'

import BorrowInfo from '../borrow-info'
import SupplyInfo from '../supply-info'

const TotalDetails = () => {
  return (
    <div className='flex flex-1 flex-col gap-8 rounded-2xl border border-[#00000052] bg-[#0B0D10CC] p-6'>
      <div className='flex flex-col gap-6'>
        <h3 className='text-[16px] font-medium leading-[16px] text-white'>Reserve status & configuration</h3>
        <div className='flex flex-col gap-8'>
          <SupplyInfo />
          <div className='w-full border border-[#43434352]' />
          <BorrowInfo />
        </div>
      </div>
    </div>
  )
}

export default TotalDetails
