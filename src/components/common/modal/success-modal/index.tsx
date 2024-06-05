import background from '@/images/modal/background.png'
import check from '@/images/modal/check.gif'
import confetti from '@/images/modal/confetti.gif'
import share from '@/images/modal/share.svg'
import solana from '@/images/modal/solana-icon.svg'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'

import { DataDisplayType } from '@/types/modal'
import BaseModal from '../base-modal'
import '../style.css'

const SuccessModal = ({
  isOpen,
  handleClose,
  data,
  inputAmt,
}: {
  isOpen: boolean
  handleClose: () => void
  data: DataDisplayType | undefined
  inputAmt: string
}) => {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <div className='w-full'>
        <Dialog.Panel className=' mx-auto  w-full max-w-xl transform overflow-hidden rounded-3xl p-[2px] shadow-xl transition-all md:max-w-[462px]'>
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
            <div className='relative mt-[14px] flex w-full flex-col items-center'>
              <Image src={check} alt='check' width={80} height={80} />

              <p className='absolute bottom-[-16px] left-0 w-full text-center text-base font-medium leading-4 text-white'>
                Deposit Completed
              </p>
            </div>

            <div className='mt-[42px] flex w-full items-center justify-center gap-4'>
              <p className='text-2xl font-bold leading-6 text-white'>
                {Number(inputAmt)} {data?.currency}
              </p>
              <Image src={data?.assetIcon ?? solana} alt='solana' width={32} height={32} />
            </div>

            <div className='mt-8 w-full '>
              <div className='flex w-full items-center justify-between border-t border-[#353535] pt-4 text-sm font-normal leading-[14px]'>
                <p className='flex-1 text-start !text-[#8F9399] text-inherit'>APY</p>
                <p className='!text-[#00E585] text-inherit'>{Math.abs(data?.apy ?? 0)}%</p>
              </div>
              <div className='mt-4 flex w-full items-center '>
                <p className='flex-1 text-start text-sm font-normal leading-[14px] text-[#8F9399]'>Transaction</p>
                <div className='flex items-center gap-2'>
                  <p className='text-sm font-normal leading-[14px] text-[#FFD02B]'>vJMT...U9Pc</p>
                  <Image src={share} alt='share' width={18} height={18} />
                </div>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 text-[#000000] hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
                  onClick={handleClose}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>

        <div className='pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center'>
          <Image src={confetti} alt='solana' fill className='object-contain' />
        </div>
      </div>
    </BaseModal>
  )
}

export default SuccessModal
