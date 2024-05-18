'use client'
import check from '@/icons/filters/check.svg'
import eclipseBlue from '@/icons/filters/ellipse-blue.svg'
import eclipse from '@/icons/filters/ellipse.svg'
import icFilter from '@/icons/filters/icon-filter.svg'
import vector from '@/icons/filters/vector.svg'

import Image from 'next/image'
import { useState } from 'react'

type props = {
  selectAction: string
  setSelectAction: (select: string) => void
}

const Filter = ({ selectAction, setSelectAction }: props) => {
  const [isActive, setIsActive] = useState(false)
  const [isActiveUSD, setIsActiveUSD] = useState(false)

  const [showSelection, setShowSelection] = useState(false)
  const [selectItem, setSelectItem] = useState('All pools')

  const toggleSwitch = () => {
    setIsActive(!isActive)
  }
  const toggleSwitchUSD = () => {
    setIsActiveUSD(!isActiveUSD)
  }

  const handleAllPoolsClick = () => {
    setShowSelection(!showSelection)
  }

  const handleFilterItemClick = (value: string) => {
    setSelectItem(value)
    setShowSelection(false)
  }

  const valueFilter = ['All pools', 'Isolated pools', 'Stablecoins', 'SOL/LST']
  return (
    <div className='relative flex w-full flex-wrap items-center  justify-between gap-3 font-helveticaNeue md:h-[50px] md:w-full  md:flex-row '>
      <div className='flex  w-full flex-wrap items-center justify-between md:w-fit  '>
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
        <div
          className='relative flex cursor-pointer  items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-2 py-3 min-[320px]:w-[180px] min-[375px]:w-[155px] min-[414px]:w-[180px]  md:hidden md:w-[180px] md:px-4'
          onClick={handleAllPoolsClick}
        >
          <div className='flex items-center justify-between min-[320px]:gap-2 min-[375px]:gap-1 min-[414px]:gap-2 md:gap-2'>
            <Image src={icFilter} alt='filter' />

            <div className='text-[14px]  font-normal leading-[14px] text-white'> {selectItem}</div>
          </div>
          <button>
            <Image src={vector} alt='vector' />
          </button>
          {showSelection && (
            <div
              style={{
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.10)',
              }}
              className='backdropFilter absolute left-0 top-12 z-40 flex flex-col items-center justify-between rounded-[8px] bg-[#FFFFFF1A] p-2 min-[320px]:w-[180px] min-[375px]:w-[155px] min-[414px]:w-[180px]  md:w-[180px] '
            >
              {valueFilter.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterItemClick(value)}
                  className={`${selectItem === value ? 'bg-[#FFFFFF1A]' : ''} flex w-full justify-between rounded-md  p-2 text-left text-[14px] font-normal leading-[14px] text-white`}
                >
                  <div>{value}</div>
                  {selectItem === value && (
                    <div>
                      <Image src={check} alt='check' />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='flex w-full flex-wrap  items-center gap-1 md:w-fit md:flex-row  md:flex-nowrap md:gap-4 '>
        <div className='flex w-full flex-wrap  items-center  justify-between gap-2 min-[315px]:flex-row min-[375px]:flex-row-reverse md:w-fit md:flex-row'>
          <div className=' flex  items-center justify-start gap-1 bg-transparent '>
            <button
              className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
              onClick={toggleSwitchUSD}
            >
              <div className={`ml-[2px] transition-transform ${isActiveUSD ? 'translate-x-[16px] ' : ''}`}>
                {isActiveUSD ? (
                  <Image src={eclipseBlue} alt='switch_icon' />
                ) : (
                  <Image src={eclipse} alt='switch_icon' />
                )}
              </div>
            </button>

            <div className='w-fit text-end font-normal leading-[14px] text-white min-[375px]:text-[13px] min-[414px]:text-[14px] md:text-[14px]'>
              USD Denominated
            </div>
          </div>
          <div className=' flex  items-center justify-start gap-1 bg-transparent '>
            <button
              className='flex h-[20px] w-[36.67px] items-center rounded-[20px] bg-[#FFFFFF1A] '
              onClick={toggleSwitch}
            >
              <div className={`ml-[2px] transition-transform ${isActive ? 'translate-x-[16px] ' : ''}`}>
                {isActive ? <Image src={eclipseBlue} alt='switch_icon' /> : <Image src={eclipse} alt='switch_icon' />}
              </div>
            </button>
            <div className='w-fit text-end font-normal leading-[14px] text-white min-[375px]:text-[13px] min-[414px]:text-[14px] md:text-[14px]'>
              Filter my positions
            </div>
          </div>
        </div>

        <div
          className='relative hidden  w-[180px] cursor-pointer items-center justify-between rounded-[8px] bg-[#FFFFFF1A] px-2 py-3  md:flex md:w-[180px] md:px-4'
          onClick={handleAllPoolsClick}
        >
          <div className='flex  items-center justify-between gap-2'>
            <Image src={icFilter} alt='filter' />

            <div className='text-[14px]  font-medium leading-[100%]  text-white'> {selectItem}</div>
          </div>
          <button>
            <Image src={vector} alt='vector' />
          </button>
          {showSelection && (
            <div
              style={{
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: ' blur(20px)',
              }}
              className='absolute left-0 top-12 z-40 flex w-[180px] flex-col items-center justify-between rounded-[8px] bg-[#FFFFFF1A] p-2  md:w-[180px] '
            >
              {valueFilter.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterItemClick(value)}
                  className={`${selectItem === value ? 'bg-[#FFFFFF1A]' : ''} flex w-full justify-between rounded-md  p-2 text-left text-[14px] font-normal leading-[14px] text-white`}
                >
                  <div>{value}</div>
                  {selectItem === value && (
                    <div>
                      <Image src={check} alt='check' />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Filter
