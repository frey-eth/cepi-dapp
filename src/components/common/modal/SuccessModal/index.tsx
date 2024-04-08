import solana from '@/images/modal/Solana.svg'
import background from '@/images/modal/backgroud.png'
import check from '@/images/modal/check.gif'
import checkBlink from '@/images/modal/checkBlink.gif'
import confeti from '@/images/modal/confeti.gif'
import share from '@/images/modal/share.svg'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import '../style.css'

const SuccessModal = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
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
          <div className='fixed inset-0 bg-black/80' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='relative flex min-h-full items-center justify-center p-4 text-center'>
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
                  className='w-full rounded-3xl bg-black p-6 text-white'
                  style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {/*  */}
                  <div className='relative mt-[14px] flex w-full flex-col items-center'>
                    <Image src={check} alt='check' width={80} height={80} />
                    <div className='absolute left-0 top-[-88px] flex w-full items-center justify-center'>
                      <Image src={checkBlink} alt='check' width={235} height={235} className='object-cover' />
                    </div>
                    <p className='absolute bottom-[-16px] left-0 w-full text-center text-base font-medium leading-4 text-white'>
                      Deposit Completed
                    </p>
                  </div>

                  {/*  */}
                  <div className='mt-[42px] flex w-full items-center justify-center'>
                    <p className='text-2xl font-bold leading-6 text-white'>0.077666892 SOL</p>
                    <Image src={solana} alt='solana' width={32} height={32} />
                  </div>

                  {/*  */}
                  <div className='mt-8 w-full '>
                    <div className='flex w-full items-center justify-between border-t border-[#353535] pt-4 text-sm font-normal leading-[14px]'>
                      <p className='flex-1 text-start !text-[#8F9399] text-inherit'>APY</p>
                      <p className='text-[#00E585] text-inherit'>8.52%</p>
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
                        className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
                        onClick={handleClose}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className='pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center'>
              <Image src={confeti} alt='solana' fill className='object-contain' />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SuccessModal
