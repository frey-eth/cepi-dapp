import ArrowBack from '@/icons/arrow-back.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import { DataDisplayType } from '@/types/modal'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'

type SettingModalType = {
  setOpenSetting: (value: boolean) => void
  dData: DataDisplayType
}

const listPriority = [
  { title: 'Normal', value: 0 },
  { title: 'High', value: 0.00005 },
  { title: 'Mamas', value: 0.005 },
]

const SettingModal = ({ setOpenSetting, dData }: SettingModalType) => {
  const [currentPriority, setPriority] = useState(listPriority[0].value)
  return (
    <div className='flex flex-col gap-6 font-helveticaNeue'>
      <Dialog.Title
        as='div'
        className='flex w-full flex-row items-center gap-[6px] text-[14px] leading-[14px]'
        onClick={() => setOpenSetting(false)}
      >
        <div className='h-4 w-4 cursor-pointer'>
          <Image src={ArrowBack} alt='arrow' objectFit='cover' />
        </div>
        <div className='cursor-pointer'> Your {dData?.title}</div>
      </Dialog.Title>

      <div className='flex w-full flex-col items-center gap-6'>
        <div className='flex w-full flex-row items-center  gap-[6px] font-medium leading-[24px] min-[320px]:text-[20px] min-[375px]:text-[24px]'>
          <div>Set transaction priority</div>
          <div className='mt-[8px] h-5 w-5'>
            <Image src={icAlert} alt='alert' objectFit='cover' id='tooltip' />
          </div>
        </div>

        <div className='flex h-[74px] w-full flex-row flex-wrap items-center justify-between md:gap-2'>
          {listPriority.map((priority, index) => (
            <div
              style={{ width: 'calc(33.3333% - 8px)' }}
              className={`flex h-full cursor-pointer flex-col justify-center gap-2 rounded-md border bg-[#0D0F10] text-[14px] leading-[14px] text-[#A5A5B5]  ${currentPriority == priority.value ? 'border-[#ED9B3C]' : 'border-transparent'}`}
              key={index}
              onClick={() => setPriority(priority.value)}
            >
              {priority.title}
              <div className='text-[16px] font-bold leading-[16px] text-[#FFFFFF]'>{priority.value} SOL</div>
            </div>
          ))}
        </div>

        <div className='flex w-full flex-col items-start gap-4 text-[14px] font-bold'>
          Or set manually
          <div className='flex h-10 w-full flex-row items-center gap-2 overflow-hidden rounded-xl border-[0.6px] border-[#FFFFFF14] bg-black  p-3 text-[16px] font-medium leading-[16px]'>
            <input
              type='number'
              placeholder='0'
              className='flex-1 bg-transparent outline-none'
              onFocus={(e) =>
                e.target.addEventListener(
                  'wheel',
                  function (e) {
                    e.preventDefault()
                  },
                  { passive: false }
                )
              }
              onChange={(e) => setPriority(parseFloat(e.target.value))}
            />
            SOL
          </div>
        </div>

        <button
          type='button'
          className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 transition-all duration-300 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
          onClick={() => {
            setOpenSetting(false)
          }}
        >
          <span className='absolute left-0 top-0 flex size-full items-center justify-center text-center align-middle text-inherit transition-all duration-300'>
            Save Settings
          </span>
        </button>
      </div>
    </div>
  )
}

export default SettingModal
