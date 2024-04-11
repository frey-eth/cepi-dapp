'use client'
import eclipse from '@/icons/filters/ellipse.svg'
import teleIcon from '@/icons/footer/telegram.svg'
import xIcon from '@/icons/footer/x.svg'
import Image from 'next/image'
import { useState } from 'react'
const Footer = () => {
  const [isActiveLite, setIsActiveLite] = useState(false)
  const [isActiveShow, setIsActiveShow] = useState(false)

  const toggleSwitchLite = () => {
    setIsActiveLite(!isActiveLite)
  }
  const toggleSwitchShow = () => {
    setIsActiveShow(!isActiveShow)
  }
  return (
    <div className='flex h-8 flex-wrap items-center justify-center gap-4 px-4 py-4  pb-10 lg:justify-between lg:gap-0 lg:px-[100px]'>
      <div className='flex items-center gap-4 lg:gap-10'>
        <div className='flex items-center gap-5'>
          <div className='text-[14px] font-medium  leading-[14px] text-white'>Lite</div>
          <button
            className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
            onClick={toggleSwitchLite}
          >
            <div className={`ml-[2px]  ${isActiveLite ? 'translate-x-[16px] transform' : ''}`}>
              <Image src={eclipse} alt='switch_icon' />
            </div>
          </button>
          <div className='text-[14px] font-medium  leading-[14px] text-white'>Pro</div>
        </div>
        <div className='h-[20px]  w-0 border border-solid border-[#FFFFFF3D]'></div>
        <div className='flex items-center gap-5'>
          <button
            className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
            onClick={toggleSwitchShow}
          >
            <div className={`ml-[2px]  ${isActiveShow ? 'translate-x-[16px] transform' : ''}`}>
              <Image src={eclipse} alt='switch_icon' />
            </div>
          </button>
          <div className='text-[14px] font-medium  leading-[14px] text-white'>Show $</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button>
          <Image src={xIcon} alt='twitter icon' />
        </button>
        <button>
          <Image src={teleIcon} alt='telegram icon' />
        </button>
      </div>
    </div>
  )
}

export default Footer
