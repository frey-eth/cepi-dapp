'use client'
import eclipse from '@/icons/filters/Ellipse.svg'
import filter from '@/icons/filters/Filter.svg'
import sort from '@/icons/filters/sorting.svg'
import vector from '@/icons/filters/vector.svg'
import Image from 'next/image'
import { useState } from 'react'
const Filter = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleSwitch = () => {
    setIsActive(!isActive)
  }
  return (
    <div className='flex h-[50px] w-full items-center justify-between'>
      <div className='flex h-full w-[156px] items-center justify-between rounded-lg bg-[#18181B52] p-[6px]'>
        <div className=' h-[38px] rounded-[4px] bg-[#FFFFFF0A] px-4 py-3 shadow-inner'>
          <div className='text-[14px] font-medium  leading-[14px] text-white'>Lend</div>
        </div>
        <div className=' h-[38px] rounded-[4px] bg-transparent px-4 py-3 '>
          {' '}
          <div className='text-[14px] font-medium  leading-[14px] text-white'>Borrow</div>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='flex items-center justify-start gap-2 bg-transparent '>
          <button
            className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
            onClick={toggleSwitch}
          >
            <div className={`ml-[2px]  ${isActive ? 'translate-x-[16px] transform' : ''}`}>
              <Image src={eclipse} alt='switch_icon' />
            </div>
          </button>
          <div className='text-[14px] font-normal leading-[14px] text-white'>Filter my positions</div>
        </div>
        <div className='flex w-[180px] items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-4 py-3'>
          <div className='flex items-center gap-2'>
            <button>
              <Image src={filter} alt='filter' />
            </button>
            <div className='text-[14px] font-normal leading-[14px] text-white'> All pools</div>
          </div>
          <button>
            {' '}
            <Image src={vector} alt='vector' />
          </button>
        </div>
        <div className='flex w-[230px] items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-4 py-3'>
          <div className='flex items-center gap-2 '>
            <button>
              {' '}
              <Image src={sort} alt='sort' />
            </button>
            <div className='text-[14px] font-normal leading-[14px] text-white'>$ highest to lowest</div>
          </div>
          <button>
            {' '}
            <Image src={vector} alt='vector' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
