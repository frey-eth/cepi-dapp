'use client'

import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import './style.css'

import group from '@/images/modal/Group.svg'
import wallet from '@/images/modal/Wallet.png'
import alert from '@/images/modal/alert-triangle-light.svg'
import background from '@/images/modal/backgroud.png'
import eye from '@/images/modal/eye-open.png'
import setting from '@/images/modal/settings.svg'
import spinner from '@/images/modal/spinner.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import SuccessModal from './SuccessModal'
import { ModalProps } from './hook/useModal'

import info from '@/images/modal/alert-circle-light.svg'
import BaseModal from './BaseModal'

export type DataDisplayType = {
  title: 'supply' | 'borrow'
  walletBalance: number
  assetIcon: string | StaticImport
  assetName: string
  currency: string
  apy: number
  available: number
}

export const Modal = ({
  isOpen,
  handleClose,
  data,
  isLoading: loading,
  handleSupply,
  isSuccess,
  handleExit,
}: ModalProps) => {
  const [inputAmt, setInputAmt] = useState<string>('')

  const [displayData, setDisplayData] = useState<DataDisplayType | undefined>()
  useEffect(() => {
    if (data) {
      const d = data.data

      const dData: DataDisplayType = {
        title: data.type,
        walletBalance: 'walletBalance' in d ? Number(d?.walletBalance.toFixed(3)) : 10,
        assetIcon: d?.asset?.icon ?? group,
        assetName: d?.asset?.name,
        currency: 'currency' in d ? (d?.currency as string) : d.asset?.name,
        apy: d?.apy,
        available: 'available' in d ? d?.available : 7.41,
      }
      setDisplayData(dData)
    } else {
      setDisplayData(undefined)
    }
  }, [data])

  useEffect(() => {
    if (isOpen) {
      setInputAmt('')
    }
  }, [isOpen])

  return (
    <>
      <BaseModal isOpen={isOpen} handleClose={handleClose}>
        <Dialog.Panel className='modal-border w-full  max-w-xl transform overflow-hidden rounded-3xl shadow-xl transition-all md:max-w-[462px]'>
          <div
            className='w-full rounded-3xl bg-black px-6 pb-10 pt-7 text-white'
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/*  */}
            <Dialog.Title as='div' className='flex w-full items-center'>
              <h5 className='flex-1 text-start text-sm font-bold leading-[14px] text-[#ffffff99]'>
                Your {displayData?.title}
              </h5>
              <div className='flex items-center gap-[16px]'>
                <div className='flex items-center gap-[8px]'>
                  <Image src={wallet} width={20} height={20} alt='image' className='object-cover' />
                  <p className='text-sm font-normal leading-[10px]'>
                    {displayData?.walletBalance} {displayData?.currency}
                  </p>
                </div>
                <button
                  onClick={() => setInputAmt(displayData ? displayData.walletBalance.toString() : '')}
                  className='rounded-full border border-[#ffffff24] px-4 py-[10px] text-[#8F9399] hover:bg-[#ffffff05]'
                >
                  MAX
                </button>
              </div>
            </Dialog.Title>

            {/*  */}
            <div className='mt-2'>
              <label className='flex w-full items-center gap-2 rounded-xl border-[0.6px] border-[#FFFFFF14] bg-black p-[12px]'>
                {/*  */}
                <div
                  className='flex h-[44px] w-[36%] min-w-[149px] items-center justify-center gap-2 rounded-lg px-4 py-[6px]'
                  style={{
                    backgroundColor: displayData?.title == 'supply' ? '#18181B' : 'transparent',
                  }}
                >
                  <Image
                    src={displayData?.assetIcon ?? group}
                    width={32}
                    height={32}
                    alt='image'
                    className='object-cover'
                  />
                  <div className='flex-1'>
                    <p className='w-full text-start text-sm font-medium leading-[14px] text-white'>
                      {displayData?.assetName}
                    </p>
                    <p
                      className='mt-[2px] w-full text-start text-xs font-normal leading-[14px]'
                      style={{
                        color:
                          displayData && displayData.apy < 0
                            ? '#dc2626'
                            : displayData?.title == 'supply'
                              ? '#00E585'
                              : '#FFD02B',
                      }}
                    >
                      {Math.abs(displayData?.apy ?? 0)}% APY
                    </p>
                  </div>
                </div>
                {/*  */}
                <div className='flex-1'>
                  <input
                    value={inputAmt}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '')
                      if (value === '') {
                        setInputAmt('')
                        return
                      }

                      if (!displayData) {
                        return
                      }

                      if (parseFloat(value) > displayData.walletBalance) {
                        setInputAmt(displayData.walletBalance.toString())
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

            {/*  */}
            {displayData?.title == 'supply' && (
              <div
                className={`w-full overflow-hidden transition-all duration-300 ${
                  inputAmt === '' || parseFloat(inputAmt) === 0
                    ? 'h-0'
                    : 'h-[86px] min-[385px]:h-[72px] min-[530px]:h-[56px]'
                }`}
              >
                <div className='mt-4 flex w-full items-center gap-3 rounded-xl bg-[#BF83491A] px-4 py-3'>
                  <Image src={alert} alt='setting' width={16} height={16} className='object-cover' />
                  <div className='flex flex-1 flex-col items-start gap-1 text-start text-sm font-medium leading-[14px] text-[#BF8349] min-[530px]:flex-row min-[530px]:items-center'>
                    <p className='text-inherit'>The oracle data for this bank is stale</p>
                    <p className='hidden text-inherit min-[530px]:!block'> - </p>
                    <a href='' className='text-inherit underline'>
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/*  */}
            {displayData?.title == 'borrow' && (
              <div className='w-full overflow-hidden transition-all duration-300'>
                <div className='mt-6 flex w-full flex-col items-center gap-2'>
                  <div className='flex w-full items-center gap-4'>
                    <div className='flex flex-1 items-center gap-2'>
                      <p className='text-sm font-normal leading-[14px] text-white'>Available collateral</p>
                      <Image src={info} alt='setting' width={16} height={16} className='object-cover' />
                    </div>
                    <p className='text-base font-medium leading-4 text-white'>${displayData?.available}</p>
                  </div>
                  <div className='h-2 w-full rounded-full bg-[#00E585]' />
                </div>
              </div>
            )}

            {/*  */}
            <div className='mt-6'>
              <button
                type='button'
                className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 transition-all duration-300 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
                onClick={() => {
                  handleSupply && handleSupply()
                }}
                disabled={loading || inputAmt === '' || parseFloat(inputAmt) === 0}
              >
                <span
                  className='absolute left-0 top-0 flex size-full items-center justify-center text-center align-middle text-inherit transition-all duration-300'
                  style={{ scale: loading ? 0 : 1 }}
                >
                  {displayData?.title == 'supply' ? 'Supply' : 'Borrow'}
                </span>
                <Image
                  src={spinner}
                  alt='setting'
                  width={24}
                  height={24}
                  className='animate-spin object-cover transition-all duration-300'
                  style={{
                    scale: loading ? 1 : 0,
                  }}
                />
              </button>
            </div>

            {/*  */}
            <div className='mt-6 flex w-full items-center'>
              <div className='flex-1 text-start'>
                <button className='flex items-center gap-2 rounded-full px-4 py-2'>
                  <Image src={eye} alt='setting' width={20} height={20} className='object-cover' />
                  <span className='text-sm font-normal leading-[14px] text-[#848895]'>View details</span>
                  <Image src={group} alt='setting' width={20} height={20} className='object-cover' />
                </button>
              </div>
              <button className='flex items-center gap-2 rounded-full border border-[#FFFFFF24] px-3 py-2'>
                <Image src={setting} alt='setting' width={20} height={20} className='object-cover' />
                <span className='text-sm font-normal leading-[14px] text-[#8F9399]'>Setting</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </BaseModal>

      <SuccessModal isOpen={isSuccess} handleClose={handleExit} data={displayData} inputAmt={inputAmt} />
    </>
  )
}
