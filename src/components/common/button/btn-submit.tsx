import spinner from '@/images/modal/spinner.svg'
import icAlert from '@/images/table/white-alert.svg'
import Image from 'next/image'
import { useState } from 'react'

type SubmitButtonProps = {
  inputAmt: string
  assetName: string
  setIsSuccess: (value: boolean) => void
  isApproved: boolean
  setIsApproved: (value: boolean) => void
  title?: string
  titleLoading?: string
}

const ButtonSubmit = ({
  inputAmt,
  setIsSuccess,
  assetName,
  isApproved,
  setIsApproved,
  title,
  titleLoading,
}: SubmitButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsApproved(true)
    }, 3000)
  }

  const handleRepay = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 3000)
  }

  return (
    <>
      {inputAmt !== '' && parseFloat(inputAmt) > 0 && !isApproved && (
        <button
          type='button'
          className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
          onClick={handleApprove}
          disabled={isLoading}
        >
          <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 text-center align-middle text-inherit'>
            Approve {assetName} to continue
            {isLoading ? (
              <Image
                src={spinner}
                alt='setting'
                width={16}
                height={16}
                className='animate-spin object-cover transition-all duration-300'
              />
            ) : (
              <Image src={icAlert} alt='alert' width={16} height={16} />
            )}
          </span>
        </button>
      )}

      {inputAmt !== '' && parseFloat(inputAmt) > 0 ? (
        <button
          type='button'
          className='relative mt-1 flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
          onClick={handleRepay}
          disabled={isLoading || !isApproved}
        >
          <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 text-center align-middle text-inherit'>
            {isLoading && isApproved ? `${titleLoading}` : `${title}`} {assetName}
            {isLoading && isApproved && (
              <Image
                src={spinner}
                alt='setting'
                width={16}
                height={16}
                className='animate-spin object-cover transition-all duration-300'
              />
            )}
          </span>
        </button>
      ) : (
        <button
          type='button'
          className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
          disabled={true}
        >
          <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 text-center align-middle text-inherit'>
            Enter an amount
          </span>
        </button>
      )}
    </>
  )
}

export default ButtonSubmit
