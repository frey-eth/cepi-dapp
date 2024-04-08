'use client'

import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import './style.css'

import group from '@/images/modal/Group.svg'
import wallet from '@/images/modal/Wallet.png'
import background from '@/images/modal/backgroud.png'
import eye from '@/images/modal/eye-open.png'
import setting from '@/images/modal/settings.svg'
import { GlobalPool } from '../../../../types/table'

export interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  data?: GlobalPool
}

export const Modal = ({ isOpen, handleClose, data }: ModalProps) => {
  const walletBalance = 0.21
  const [supply, setSupply] = useState<string>('')

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='modal-border w-full max-w-md transform overflow-hidden rounded-3xl shadow-xl transition-all'>
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
                    <h5 className='flex-1 text-start text-sm font-bold leading-[14px] text-[#ffffff99]'>Your supply</h5>
                    <div className='flex items-center gap-[16px]'>
                      <div className='flex items-center gap-[8px]'>
                        <Image src={wallet} width={20} height={20} alt='image' className='object-cover' />
                        <p className='text-sm font-normal leading-[10px]'>
                          {/* !!!! Need currency */}
                          {walletBalance} {data?.asset.name}
                        </p>
                      </div>
                      <button
                        onClick={() => setSupply(walletBalance.toString())}
                        className='rounded-full border border-[#ffffff24] px-4 py-[10px] text-[#8F9399] hover:bg-[#ffffff05]'
                      >
                        MAX
                      </button>
                    </div>
                  </Dialog.Title>

                  {/*  */}
                  <div className='mt-2'>
                    <label className='flex w-full items-center gap-2 rounded-xl bg-black p-[12px]'>
                      {/*  */}
                      <div className='flex h-[44px] w-[36%] min-w-[149px] items-center justify-center gap-2 rounded-lg bg-[#18181B] px-4 py-[6px]'>
                        <Image
                          src={data?.asset.icon ?? group}
                          width={32}
                          height={32}
                          alt='image'
                          className='object-cover'
                        />
                        <div className='flex-1'>
                          <p className='w-full text-start text-sm font-medium leading-[14px] text-white'>
                            {data?.asset.name}
                          </p>
                          <p className='mt-[2px] w-full text-start text-xs font-normal leading-[14px] text-[#00E585]'>
                            {data?.apy}% APY
                          </p>
                        </div>
                      </div>
                      {/*  */}
                      <input
                        value={supply}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '')
                          if (value === '') {
                            setSupply('')
                          } else if (parseFloat(value) > walletBalance) {
                            setSupply(walletBalance.toString())
                          } else {
                            setSupply(value)
                          }
                        }}
                        type='text'
                        pattern='[0-9\/]*'
                        className='flex-1 bg-transparent text-end text-base font-medium leading-4 text-white focus:outline-none'
                        placeholder='0'
                      />
                    </label>
                  </div>

                  {/*  */}
                  <div className='mt-6'>
                    <button
                      type='button'
                      className='flex w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
                      onClick={handleClose}
                      disabled={supply === '' || parseFloat(supply) === 0}
                    >
                      Supply
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
