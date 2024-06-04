'use client'

import '../style.css'

import { useBalance } from '@/hooks/useBalance'
import background from '@/images/modal/background.png'
import close from '@/images/modal/close-circle.svg'
import gas from '@/images/modal/gas.svg'
import group from '@/images/modal/group-icon.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import { Dialog } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

import { DataDisplayType, ModalProps } from '@/types/modal'
import WithdrawSubmitButton from '../../button/btn-submit-withdraw'
import CustomTooltip from '../../tooltip'
import BaseModal from '../base-modal'

const SuccessWithdrawRepayModal = dynamic(() => import('../success-wr-modal'), {
  ssr: false,
})

const WithdrawRepayModal = ({ isOpen, data, setIsOpen, type }: ModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [inputAmt, setInputAmt] = useState<string>('')
  const [isApproved, setIsApproved] = useState(false)
  const d = data?.data
  const { balance } = useBalance(d?.addressToken)
  const dData: DataDisplayType = {
    title: data?.type || undefined,
    walletBalance: 'walletBalance' in d ? Number(d?.walletBalance.toFixed(3)) : balance,
    assetIcon: d?.asset?.icon ?? group,
    assetName: d?.asset?.name,
    currency: 'currency' in d ? (d?.currency as string) : d.asset?.name,
    apy: d?.apy,
    available: 'available' in d ? d?.available : 7.41,
    balance: d?.balance?.amount,
    addressToken: d?.addressToken,
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleExit = useCallback(() => {
    setIsOpen(false)
    setIsSuccess(false)
  }, [setIsOpen])

  return (
    <>
      {!isSuccess && (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
          <Dialog.Panel className=' relative w-full  max-w-xl transform overflow-hidden rounded-3xl p-[1px] font-helveticaNeue  shadow-xl transition-all md:max-w-[462px]'>
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
              <Dialog.Title as='div' className='flex w-full items-center font-helveticaNeue'>
                <div className='flex w-full items-center justify-between '>
                  <div className=' cursor-pointer text-[20px] font-medium capitalize leading-[100%] text-white '>
                    {dData?.title} {dData?.currency}
                  </div>

                  <button onClick={handleClose}>
                    <Image src={close} alt='close' width={24} height={24} />
                  </button>
                </div>
                <div></div>
              </Dialog.Title>

              <div className='mt-6'>
                <div className='flex items-center justify-between'>
                  <div className='text-[14px] font-medium leading-[100%] text-[#A5A5B5] '>Amount</div>
                  <div className='flex items-center gap-4'>
                    <div className='text-[14px] font-medium leading-[100%] text-[#A5A5B5]'>
                      Supply balance <span className='text-white'>{balance}</span>
                    </div>

                    <div
                      onClick={() => {
                        if (balance > 0) {
                          setInputAmt(dData ? dData.walletBalance.toString() : '')
                        }
                      }}
                      className='flex cursor-pointer items-center justify-center gap-[10px] rounded-[32px] border border-solid border-[rgba(255,255,255,0.14)] bg-[rgba(0,0,0,0.10)] px-4 py-2 text-[14px] font-medium leading-[100%] text-[#8F9399] backdrop-blur-[8px] '
                    >
                      MAX
                    </div>
                  </div>
                </div>
                <label className='mt-2 flex w-full items-center gap-2 rounded-xl border-[0.6px] border-[#FFFFFF14] bg-black p-[12px]'>
                  <div className='flex h-[32px] items-center gap-2  '>
                    <Image
                      src={dData?.assetIcon ?? group}
                      width={32}
                      height={32}
                      alt='image'
                      className='object-cover'
                    />

                    <div className='w-full text-start text-sm font-medium leading-[14px] text-white'>
                      {dData?.assetName}
                    </div>
                  </div>

                  <div className='flex-1'>
                    <input
                      readOnly={isApproved || balance === 0}
                      value={inputAmt}
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
                <div className='my-4 flex flex-col gap-2'>
                  <div className='text-start text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
                    Transaction overview
                  </div>
                  <div className='flex w-full items-center justify-between rounded-[12px] border border-solid border-[rgba(255,255,255,0.08)] bg-black p-3'>
                    <div className='text-[12px] font-medium leading-[100%] text-white'>Remaining supply</div>
                    <div className='text-[14px] font-medium leading-[100%] text-white'>
                      {isNaN(parseFloat(inputAmt)) ? balance : Math.round((balance - parseFloat(inputAmt)) * 100) / 100}{' '}
                      <span className='text-[text-[12px] text-white] font-medium leading-[100%]'>
                        {dData?.assetName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2 py-2 leading-[14px]'>
                  <Image src={gas} alt='gas' width={16} height={16} />
                  {parseFloat(inputAmt) > 0 && inputAmt !== '' ? (
                    <div className='flex items-center gap-1'>
                      <div className='mt-[1px] text-[14px] font-medium leading-[100%] text-[#A5A5B5]'> {'<$'} 0.01</div>
                      <Image src={icAlert} alt='alert' id='gas_fee' />
                    </div>
                  ) : (
                    <div className='text-[14px] font-medium leading-[100%] text-white'>-</div>
                  )}
                </div>
              </div>
              <CustomTooltip
                id={'gas_fee'}
                content={
                  'This gas calculation is only an estimation. Your wallet will set the price of the transaction. You can modify the gas settings directly from your wallet provider.'
                }
              />

              <div className='mt-6'>
                <WithdrawSubmitButton
                  inputAmt={inputAmt}
                  setIsSuccess={setIsSuccess}
                  assetName={dData?.assetName}
                  isApproved={isApproved}
                  setIsApproved={setIsApproved}
                />
              </div>
            </div>
          </Dialog.Panel>
        </BaseModal>
      )}

      {isSuccess && (
        <SuccessWithdrawRepayModal
          type={type}
          isOpen={isSuccess}
          handleClose={handleExit}
          data={dData}
          inputAmt={inputAmt}
        />
      )}
    </>
  )
}

export default memo(WithdrawRepayModal)
