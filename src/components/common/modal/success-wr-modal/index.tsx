import share from '@/icons/details/share.svg'
import background from '@/images/modal/background.png'
import check from '@/images/modal/check.gif'
import confetti from '@/images/modal/confetti.gif'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { DataDisplayType } from '../../../../../types/modal'
import BaseModal from '../base-modal'
import '../style.css'

const SuccessWithdrawRepayModal = ({
  isOpen,
  handleClose,
  data,
  inputAmt,
  type,
}: {
  isOpen: boolean
  handleClose: () => void
  data: DataDisplayType | undefined
  inputAmt: string
  type?: string
}) => {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <div className='w-full'>
        <Dialog.Panel className='modal-border mx-auto w-full max-w-xl transform overflow-hidden rounded-3xl font-helveticaNeue shadow-xl transition-all md:max-w-[462px]'>
          <div
            className='w-full rounded-3xl bg-black p-6 text-white'
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='relative mt-[14px] flex w-full flex-col items-center'>
              <Image src={check} alt='check' width={80} height={80} />

              <p className='absolute bottom-[-16px] left-0 w-full text-center text-[24px] text-base font-medium leading-4 text-white'>
                All done!
              </p>
            </div>

            <div className='mt-[32px] flex w-full items-center justify-center gap-4'>
              <p className='text-[16px] font-normal leading-[16px] text-[#A5A5B5] '>
                Your {type === 'withdraw' ? 'withdraw' : 'repay'} <span className='text-white'>{Number(inputAmt)}</span>{' '}
                {data?.currency}
              </p>
            </div>

            <div className='mt-8 w-full '>
              <div className='flex items-center justify-end gap-2'>
                <div className='text-[14px] font-medium leading-[100%] text-[#A5A5B5]'>Review tx details</div>
                <Image src={share} alt='share' width={14} height={14} />
              </div>
              <div className='mt-4'>
                <button
                  type='button'
                  className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 text-white hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
                  onClick={handleClose}
                >
                  Ok, close
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

export default SuccessWithdrawRepayModal
