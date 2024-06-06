import background from '@/images/modal/background.png'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const BaseModal = ({
  isOpen,
  handleClose,
  children,
}: {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
}) => {
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
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BaseModal
