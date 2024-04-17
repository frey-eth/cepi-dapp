'use client'
import eclipse from '@/icons/filters/ellipse.svg'
import filter from '@/icons/filters/filter.svg'
import sort from '@/icons/filters/sorting.svg'
import vector from '@/icons/filters/vector.svg'
import Image from 'next/image'
import { useState } from 'react'
const Filter = () => {
  const [isActive, setIsActive] = useState(false)
  const [selectAction, setSelectAction] = useState('Lend')

  const toggleSwitch = () => {
    setIsActive(!isActive)
  }
  return (
    <div className='relative flex  h-[50px] w-[350px] flex-wrap items-center gap-3 font-helveticaNeue md:w-full  md:flex-row '>
      <div className='flex w-[350px] items-center justify-between md:w-[795px] '>
        <div className='flex h-full w-[156px] items-center justify-between rounded-lg bg-[#18181B52] p-[6px] '>
          <button
            onClick={() => {
              setSelectAction('Lend')
            }}
            className={` ${selectAction === 'Lend' ? 'bg-[#FFFFFF0A] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.16)_inset,_0px_0px_8px_0px_rgba(255,255,255,0.08)_inset]' : 'bg-transparent'} h-[38px] rounded-[4px]  px-4 py-3 `}
          >
            <div className='text-[14px] font-medium  leading-[14px] text-white'>Lend</div>
          </button>
          <button
            onClick={() => {
              setSelectAction('Borrow')
            }}
            className={`${selectAction === 'Borrow' ? 'bg-[#FFFFFF0A] shadow-inner' : 'bg-transparent'} h-[38px] rounded-[4px]  px-4 py-3 `}
          >
            <div className={` text-[14px] font-medium  leading-[14px] text-white`}>Borrow</div>
          </button>
        </div>

        <div className=' flex  items-center justify-start gap-2 bg-transparent '>
          <button
            className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
            onClick={toggleSwitch}
          >
            <div className={`ml-[2px] transition-transform ${isActive ? 'translate-x-[16px] ' : ''}`}>
              <Image src={eclipse} alt='switch_icon' />
            </div>
          </button>
          <div className='text-[14px] font-normal leading-[14px] text-white'>Filter my positions</div>
        </div>
      </div>

      <div className='flex w-[350px]  items-center gap-4 md:w-[400px] '>
        <div className='flex w-[134px] items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-3 py-3 md:w-[180px] md:px-4'>
          <div className='flex  items-center justify-between gap-2'>
            <button className='flex h-5 w-5 items-center justify-center'>
              <Image src={filter} alt='filter' />
            </button>
            <div className='text-[14px] font-normal leading-[14px] text-white'> All pools</div>
          </div>
          <button>
            <Image src={vector} alt='vector' />
          </button>
        </div>
        <div className='flex w-[200px] items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-3 py-3 md:w-[230px] md:px-4 '>
          <div className='flex items-center justify-between gap-2 '>
            <button className='flex h-5 w-5 items-center justify-center'>
              <Image src={sort} alt='sort' />
            </button>
            <div className='text-[14px] font-normal leading-[14px] text-white'>$ Highest to lowest</div>
          </div>
          <button>
            <Image src={vector} alt='vector' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
