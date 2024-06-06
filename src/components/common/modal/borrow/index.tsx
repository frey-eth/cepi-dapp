'use client'

import info from '@/images/modal/alert-circle-light.svg'
import background from '@/images/modal/background.png'
import down from '@/images/modal/down-icon.svg'
import eye from '@/images/modal/eye-open.png'
import group from '@/images/modal/group-icon.svg'
import setting from '@/images/modal/settings.svg'
import up from '@/images/modal/up-icon.svg'
import wallet from '@/images/modal/wallet-icon.png'
import { Dialog } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

import { DataDisplayType, ModalProps } from '@/types/modal'

import { useBalance } from '@/hooks/useBalance'
import CustomTooltip from '../../tooltip'
import BaseModal from '../base-modal'
import SubmitButton from '../buttonSubmit'
import SettingModal from '../setting-modal'
import '../style.css'

const SuccessModal = dynamic(() => import('../success-modal'), {
  ssr: false,
})

const BorrowModal = ({ isOpen, data, setIsOpen }: ModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [inputAmt, setInputAmt] = useState<string>('')
  const [viewDetail, setViewDetail] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const d = data?.data

  const dData: DataDisplayType = {
    title: data?.type || undefined,
    walletBalance: 'walletBalance' in d ? Number(d?.walletBalance.toFixed(3)) : 0.21,
    assetIcon: d?.asset?.icon ?? group,
    assetName: d?.asset?.name,
    currency: 'currency' in d ? (d?.currency as string) : d.asset?.name,
    apy: d?.apy,
    available: 'available' in d ? d?.available : 7.41,
    addressToken: d?.addressToken,
  }

  const { balance } = useBalance(dData?.addressToken)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleExit = useCallback(() => {
    setIsOpen(false)
    setIsSuccess(false)
  }, [setIsOpen])

  return (
    <>
      <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <Dialog.Panel className=' relative w-full  max-w-xl transform overflow-hidden rounded-3xl p-[2px] font-helveticaNeue  shadow-xl transition-all md:max-w-[462px]'>
          <div className='absolute left-1/2 top-1/2 z-0 flex aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
            <div className='  flex size-full animate-[spin_10s_linear_infinite] flex-col'>
              <div className='linear-bg h-[30%]'></div>
              <div className='flex-1'></div>
              <div className='linear-whitebg h-[30%] '></div>
            </div>
          </div>
          <div
            className='relative z-20 w-full rounded-3xl bg-black px-6 pb-10 pt-7 text-white '
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {!openSetting ? (
              <>
                <Dialog.Title as='div' className='flex w-full items-center font-helveticaNeue'>
                  <h5 className='flex-1 cursor-pointer text-start text-sm font-bold leading-[14px] text-[#ffffff99]'>
                    Your {dData?.title}
                  </h5>
                  <div className='flex items-center gap-[16px]'>
                    <div className='flex items-center gap-[8px]'>
                      <Image src={wallet} width={20} height={20} alt='image' className='object-cover' />
                      <p className='mt-[2px] text-sm font-normal leading-[10px]'>
                        {dData?.walletBalance.toString()} LST
                      </p>
                    </div>
                    <div
                      role='button'
                      onClick={() => {
                        if (balance > 0) {
                          setInputAmt(dData ? dData.walletBalance.toString() : '')
                        }
                      }}
                      className=' flex h-[34px] w-[62px] cursor-pointer items-center justify-center rounded-[32px] border border-[#ffffff24] text-[14px] leading-[14px] text-[#8F9399] hover:bg-[#ffffff05]'
                    >
                      <div className='mt-[2px]'>MAX</div>
                    </div>
                  </div>
                </Dialog.Title>

                <div className='mt-2'>
                  <label className='flex w-full items-center gap-2 rounded-xl border-[0.6px] border-[#FFFFFF14] bg-black p-[12px]'>
                    <div
                      className='flex h-[44px] w-[36%] min-w-[149px] items-center justify-center gap-2 rounded-lg px-4 py-[6px]'
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Image
                        src={dData?.assetIcon ?? group}
                        width={32}
                        height={32}
                        alt='image'
                        className='object-cover'
                      />
                      <div className='flex-1'>
                        <p className='w-full text-start text-sm font-medium leading-[14px] text-white'>
                          {dData?.assetName}
                        </p>
                        <p
                          className='mt-[2px] w-full text-start text-xs font-normal leading-[14px]'
                          style={{
                            color: dData && dData.apy < 0 ? '#dc2626' : '#FFD02B',
                          }}
                        >
                          {Math.abs(dData?.apy ?? 0)}% APY
                        </p>
                      </div>
                    </div>

                    <div className='flex-1'>
                      <input
                        value={inputAmt}
                        readOnly={balance === 0}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '')
                          if (value === '') {
                            setInputAmt('')
                            return
                          }

                          if (!dData) {
                            return
                          }

                          if (parseFloat(value) > dData.walletBalance) {
                            setInputAmt(dData.walletBalance.toString())
                          } else {
                            setInputAmt(value)
                          }
                        }}
                        type='text'
                        pattern='[0-9\/]*'
                        className='w-full bg-transparent text-end text-base font-medium leading-4 text-white focus:outline-none'
                        placeholder='0'
                      />
                    </div>
                  </label>
                </div>

                <div className='w-full overflow-hidden transition-all duration-300'>
                  <div className='mt-6 flex w-full flex-col items-center gap-2'>
                    <div className='flex w-full items-center gap-4'>
                      <div className='flex flex-1 items-center gap-2'>
                        <p className='text-sm font-normal leading-[14px] text-white'>Available collateral</p>
                        <Image
                          src={info}
                          alt='setting'
                          id='borrow-info'
                          width={16}
                          height={16}
                          className='object-cover'
                        />
                      </div>
                      <p className='text-base font-medium leading-4 text-white'>${dData?.available}</p>
                    </div>
                    <div className='h-2 w-full rounded-full bg-[#00E585]' />
                  </div>
                </div>

                <div className='mt-6'>
                  <SubmitButton inputAmt={inputAmt} setIsSuccess={setIsSuccess} label='Borrow' />
                </div>

                <div className='mt-6 flex w-full items-center'>
                  <div className='flex-1 text-start'>
                    <button
                      onClick={() => {
                        setViewDetail(!viewDetail)
                      }}
                      className='flex items-center gap-2 rounded-full  py-2'
                    >
                      <Image src={eye} alt='setting' width={20} height={20} className='object-cover' />
                      <span className='font-helveticaNeue text-sm font-normal leading-[14px] text-[#848895]'>
                        View details
                      </span>
                      {viewDetail ? (
                        <Image src={up} alt='setting' className='object-cover' />
                      ) : (
                        <Image src={down} alt='setting' className='object-cover' />
                      )}
                    </button>
                  </div>
                  <button
                    className='flex h-[36px] w-[97px] items-center justify-center gap-2 rounded-full border border-[#FFFFFF24]'
                    onClick={() => setOpenSetting(true)}
                  >
                    <Image src={setting} alt='setting' width={20} height={20} className='object-cover' />
                    <span className='font-helveticaNeue  text-sm font-normal leading-[14px] text-[#8F9399]'>
                      Setting
                    </span>
                  </button>
                </div>

                <div
                  className={`w-full overflow-hidden font-helveticaNeue  transition-all duration-300 ${
                    viewDetail ? 'h-fit min-[385px]:h-[145px] min-[530px]:h-[143px]' : 'h-0'
                  }`}
                >
                  <div className='mt-2 w-full border-[1px] border-solid border-[#FFFFFF1F]'></div>
                  <div className='mt-2 flex flex-col gap-[6px] font-helveticaNeue'>
                    <div className='flex items-center justify-between'>
                      <div className='leading-[14px font-normal] text-[14px] text-[#8F9399]'>Your amount</div>
                      <div className='text-[14px] font-medium leading-[14px] text-[#FFFFFF]'>0 SOL</div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='leading-[14px font-normal] text-[14px] text-[#8F9399]'>Health</div>
                      <div className='text-[14px] font-medium leading-[14px] text-[#00E585]'>100 %</div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='leading-[14px font-normal] text-[14px] text-[#8F9399]'>Pool size</div>
                      <div className='text-[14px] font-medium leading-[14px] text-[#FFFFFF]'>842k</div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='leading-[14px font-normal] text-[14px] text-[#8F9399]'>Type</div>
                      <div className='text-[14px] font-medium leading-[14px] text-[#FFFFFF]'>Global pool</div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='leading-[14px font-normal] text-[14px] text-[#8F9399]'>Oracle</div>
                      <div className='text-[14px] font-medium leading-[14px] text-[#FFFFFF]'>Pyth</div>
                    </div>
                  </div>
                </div>
                <CustomTooltip
                  id='borrow-info'
                  content='This is the total amount available for you to borrow. You can borrow based on your collateral and until the borrow cap is reached.'
                />
              </>
            ) : (
              <SettingModal setOpenSetting={setOpenSetting} dData={dData} />
            )}
          </div>
        </Dialog.Panel>
      </BaseModal>

      {isSuccess && <SuccessModal isOpen={isSuccess} handleClose={handleExit} data={dData} inputAmt={inputAmt} />}
    </>
  )
}

export default memo(BorrowModal)
