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
import { DataDisplayType, ModalProps } from '../../../../../types/modal'
import RepaySubmitButton from '../../button/btn-submit-repay'
import WithdrawSubmitButton from '../../button/btn-submit-withdraw'
import BaseModal from '../base-modal'

const SuccessWithdrawRepayModal = dynamic(() => import('../success-wr-modal'), {
  ssr: false,
})

const WithdrawRepayModal = ({ isOpen, data, setIsOpen, type }: ModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [inputAmt, setInputAmt] = useState<string>('')

  const d = data?.data
  const dData: DataDisplayType = {
    title: data?.type || undefined,
    walletBalance: 'walletBalance' in d ? Number(d?.walletBalance.toFixed(3)) : 10,
    assetIcon: d?.asset?.icon ?? group,
    assetName: d?.asset?.name,
    currency: 'currency' in d ? (d?.currency as string) : d.asset?.name,
    apy: d?.apy,
    available: 'available' in d ? d?.available : 7.41,
    address_token: d?.address_token,
  }

  const { balance } = useBalance(dData?.address_token)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleExit = useCallback(() => {
    setIsOpen(false)
    setIsSuccess(false)
  }, [setIsOpen])
  const capitalizeWords = (str: string): string =>
    str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  return (
    <>
      {!isSuccess && (
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
              <Dialog.Title as='div' className='flex w-full items-center font-helveticaNeue'>
                <div className='flex w-full items-center justify-between '>
                  <div className=' cursor-pointer text-[20px] font-medium leading-[100%] text-white '>
                    {capitalizeWords(dData?.title as string)} {dData?.currency}
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
                    <div className='flex items-center justify-center gap-[10px] rounded-[32px] border border-solid border-[rgba(255,255,255,0.14)] bg-[rgba(0,0,0,0.10)] px-4 py-2 text-[14px] font-medium leading-[100%] text-[#8F9399] backdrop-blur-[8px] '>
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
                  {type === 'withdraw' ? (
                    <div className='flex w-full items-center justify-between rounded-[12px] border border-solid border-[rgba(255,255,255,0.08)] bg-black p-3'>
                      <div className='text-[12px] font-medium leading-[100%] text-white'>Remaining supply</div>
                      <div className='text-[14px] font-medium leading-[100%] text-white'>
                        100.00 <span className='text-[text-[12px] text-white] font-medium leading-[100%]'>SOL</span>
                      </div>
                    </div>
                  ) : (
                    <div className='flex w-full flex-col items-start gap-4 rounded-[12px] border border-solid border-[rgba(255,255,255,0.08)] bg-black p-3'>
                      <div className='flex w-full items-start justify-between'>
                        <div className='text-[12px] font-medium leading-[100%] text-[#FFFFFF]'>Remaining debt</div>
                        <div className='flex flex-col items-end gap-[6px]'>
                          <div className='flex items-center gap-[6px] text-[14px] font-medium leading-[100%] text-white'>
                            <div>20.000 SOL</div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='12'
                              height='12'
                              viewBox='0 0 12 12'
                              fill='none'
                            >
                              <path
                                d='M10.95 5.8C10.9 5.75 10.9 5.7 10.85 5.65L7.85 2.65C7.65 2.45 7.35 2.45 7.15 2.65C6.95 2.85 6.95 3.15 7.15 3.35L9.3 5.5H1.5C1.2 5.5 1 5.7 1 6C1 6.3 1.2 6.5 1.5 6.5H9.3L7.15 8.65C6.95 8.85 6.95 9.15 7.15 9.35C7.25 9.45 7.4 9.5 7.5 9.5C7.6 9.5 7.75 9.45 7.85 9.35L10.85 6.35C10.9 6.3 10.95 6.25 10.95 6.2C11 6.05 11 5.95 10.95 5.8Z'
                                fill='white'
                              />
                            </svg>
                            <div>20.000 SOL</div>
                          </div>
                          <div className='flex items-center gap-[6px] text-[12px] font-medium leading-[100%] text-[#A5A5B5]'>
                            <div>$ 19.99</div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='12'
                              height='12'
                              viewBox='0 0 12 12'
                              fill='none'
                            >
                              <path
                                d='M10.95 5.8C10.9 5.75 10.9 5.7 10.85 5.65L7.85 2.65C7.65 2.45 7.35 2.45 7.15 2.65C6.95 2.85 6.95 3.15 7.15 3.35L9.3 5.5H1.5C1.2 5.5 1 5.7 1 6C1 6.3 1.2 6.5 1.5 6.5H9.3L7.15 8.65C6.95 8.85 6.95 9.15 7.15 9.35C7.25 9.45 7.4 9.5 7.5 9.5C7.6 9.5 7.75 9.45 7.85 9.35L10.85 6.35C10.9 6.3 10.95 6.25 10.95 6.2C11 6.05 11 5.95 10.95 5.8Z'
                                fill='#A5A5B5'
                              />
                            </svg>
                            <div>$ 19.99</div>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-full items-start justify-between'>
                        <div className='text-[12px] font-medium leading-[100%] text-[#FFFFFF]'>Health factor</div>
                        <div className='flex flex-col items-end gap-[6px]'>
                          <div className='flex items-center gap-[6px] text-[14px] font-medium leading-[100%] text-[#00E585]'>
                            <div>9.17</div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='12'
                              height='12'
                              viewBox='0 0 12 12'
                              fill='none'
                            >
                              <path
                                d='M10.95 5.8C10.9 5.75 10.9 5.7 10.85 5.65L7.85 2.65C7.65 2.45 7.35 2.45 7.15 2.65C6.95 2.85 6.95 3.15 7.15 3.35L9.3 5.5H1.5C1.2 5.5 1 5.7 1 6C1 6.3 1.2 6.5 1.5 6.5H9.3L7.15 8.65C6.95 8.85 6.95 9.15 7.15 9.35C7.25 9.45 7.4 9.5 7.5 9.5C7.6 9.5 7.75 9.45 7.85 9.35L10.85 6.35C10.9 6.3 10.95 6.25 10.95 6.2C11 6.05 11 5.95 10.95 5.8Z'
                                fill='white'
                              />
                            </svg>
                            <div>∞</div>
                          </div>
                          <div className='flex items-center gap-[6px] text-[12px] font-medium leading-[100%] text-[#A5A5B5]'>
                            Liquidation at {'<'}1.0
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-2 py-2 leading-[14px]'>
                  <Image src={gas} alt='gas' width={16} height={16} />
                  {parseFloat(inputAmt) > 0 && inputAmt !== '' ? (
                    <div className='flex items-center gap-1'>
                      <div className='mt-[1px] text-[14px] font-medium leading-[100%] text-[#A5A5B5]'> {'<$'} 0.01</div>
                      <Image src={icAlert} alt='alert' />
                    </div>
                  ) : (
                    <div className='text-[14px] font-medium leading-[100%] text-white'>-</div>
                  )}
                </div>
              </div>

              <div className='mt-6'>
                {type === 'withdraw' ? (
                  <WithdrawSubmitButton inputAmt={inputAmt} setIsSuccess={setIsSuccess} assetName={dData?.assetName} />
                ) : (
                  <RepaySubmitButton inputAmt={inputAmt} setIsSuccess={setIsSuccess} assetName={dData?.assetName} />
                )}
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
