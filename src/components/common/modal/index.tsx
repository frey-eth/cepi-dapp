'use client'

import down from '@/images/modal/Down.svg'
import group from '@/images/modal/Group.svg'
import up from '@/images/modal/Up.svg'
import wallet from '@/images/modal/Wallet.png'
import alert from '@/images/modal/alert-triangle-light.svg'
import background from '@/images/modal/backgroud.png'
import eye from '@/images/modal/eye-open.png'
import setting from '@/images/modal/settings.svg'
import spinner from '@/images/modal/spinner.svg'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { Dialog } from '@headlessui/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import './style.css'
import SuccessModal from './success-modal'

import info from '@/images/modal/alert-circle-light.svg'
import { useBalance } from '../../../hooks/useBalance'
import BaseModal from './base-modal'

import ArrowBack from '@/icons/arrow-back.svg'
import { ModalProps } from '../../../hooks/useModal'
import CustomTooltip from '../tooltip'
export type DataDisplayType = {
  title: 'supply' | 'borrow'
  walletBalance: number
  assetIcon: string | StaticImport
  assetName: string
  currency: string
  apy: number
  available: number
  address_token?: string
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

  const [viewDetail, setViewDetail] = useState(false)

  const [openSetting, setOpenSetting] = useState(false)

  const [displayData, setDisplayData] = useState<DataDisplayType | undefined>()

  const { balance } = useBalance(displayData?.address_token)

  const listPriority = [
    { title: 'Normal', value: 0 },
    { title: 'High', value: 0.00005 },
    { title: 'Mamas', value: 0.005 },
  ]

  const [currentPriority, setPriority] = useState(listPriority[0].value)

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
        address_token: '',
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
            {!openSetting ? (
              <>
                <Dialog.Title as='div' className='flex w-full items-center'>
                  <h5 className='flex-1 cursor-pointer text-start text-sm font-bold leading-[14px] text-[#ffffff99]'>
                    Your {displayData?.title}
                  </h5>
                  <div className='flex items-center gap-[16px]'>
                    <div className='flex items-center gap-[8px]'>
                      <Image src={wallet} width={20} height={20} alt='image' className='object-cover' />
                      <p className='mt-[2px] text-sm font-normal leading-[10px]'>
                        {balance} {displayData?.currency}
                      </p>
                    </div>
                    <div
                      onClick={() => setInputAmt(displayData ? displayData.walletBalance.toString() : '')}
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

                <div className='mt-6 flex w-full items-center'>
                  <div className='flex-1 text-start'>
                    <button
                      onClick={() => {
                        setViewDetail(!viewDetail)
                      }}
                      className='flex items-center gap-2 rounded-full  py-2'
                    >
                      <Image src={eye} alt='setting' width={20} height={20} className='object-cover' />
                      <span className='text-sm font-normal leading-[14px] text-[#848895]'>View details</span>
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
                    <span className='text-sm font-normal leading-[14px] text-[#8F9399]'>Setting</span>
                  </button>
                </div>

                <div
                  className={`w-full overflow-hidden transition-all duration-300 ${
                    viewDetail ? 'h-fit min-[385px]:h-[145px] min-[530px]:h-[143px]' : 'h-0'
                  }`}
                >
                  <div className='mt-2 w-full border-[1px] border-solid border-[#FFFFFF1F]'></div>
                  <div className='mt-2 flex flex-col gap-[6px]'>
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
              </>
            ) : (
              <div className='flex flex-col gap-6 font-helveticaNeue'>
                <Dialog.Title
                  as='div'
                  className='flex w-full flex-row items-center gap-[6px] text-[14px] leading-[14px]'
                  onClick={() => setOpenSetting(false)}
                >
                  <div className='h-4 w-4 cursor-pointer'>
                    <Image src={ArrowBack} alt='arrow' objectFit='cover' />
                  </div>
                  <div className='cursor-pointer'> Your {displayData?.title}</div>
                </Dialog.Title>

                <div className='flex w-full flex-col items-center gap-6'>
                  <div className='flex w-full flex-row items-center  gap-[6px] font-helveticaNeue font-medium leading-[24px] min-[320px]:text-[20px] min-[375px]:text-[24px]'>
                    <div>Set transaction priority</div>
                    <div className='mt-[8px] h-5 w-5'>
                      <Image src={ic_alert} alt='arlet' objectFit='cover' id='tooltip' />
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
                    <span
                      className='absolute left-0 top-0 flex size-full items-center justify-center text-center align-middle text-inherit transition-all duration-300'
                      // style={{ scale: loading ? 0 : 1 }}
                    >
                      Save Settings
                    </span>
                    {/* <Image
                      src={spinner}
                      alt='setting'
                      width={24}
                      height={24}
                      className='animate-spin object-cover transition-all duration-300'
                      style={{
                        scale: loading ? 1 : 0,
                      }}
                    /> */}
                  </button>
                </div>
              </div>
            )}
          </div>
          <CustomTooltip id='tooltip' content='This additional fee helps boost how a transaction is prioritized.' />
        </Dialog.Panel>
      </BaseModal>

      <SuccessModal isOpen={isSuccess} handleClose={handleExit} data={displayData} inputAmt={inputAmt} />
    </>
  )
}
