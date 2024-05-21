import spinner from '@/images/modal/spinner.svg'
import icAlert from '@/images/table/white-alert.svg'
import Image from 'next/image'
import { useState } from 'react'

type SubmitButtonProps = {
  inputAmt: string
  assetName: string
  setIsSuccess: (value: boolean) => void
}

const RepaySubmitButton = ({ inputAmt, setIsSuccess, assetName }: SubmitButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState(`Approve ${assetName} to continue`)
  const [showRepay, setShowRepay] = useState(true)

  const handleApprove = () => {
    setIsLoading(true)
    setTimeout(() => {
      setShowRepay(false)
      setTimeout(() => {
        setButtonText(`Repaying ${assetName}...`)
        setTimeout(() => {
          setIsLoading(false)
          setIsSuccess(true)
          setButtonText('Successfully repaid')
        }, 3000)
      }, 3000)
    }, 3000)
  }

  return (
    <div>
      <button
        type='button'
        className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
        onClick={handleApprove}
        disabled={isLoading || inputAmt === '' || parseFloat(inputAmt) === 0}
      >
        <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 text-center align-middle text-inherit'>
          {isLoading ? buttonText : `Approve ${assetName} to continue`}
          {isLoading ? (
            <Image
              src={spinner}
              alt='setting'
              width={16}
              height={16}
              className='animate-spin object-cover transition-all duration-300'
              style={{
                scale: isLoading ? 1 : 0,
              }}
            />
          ) : (
            <Image src={icAlert} alt='alert' width={16} height={16} />
          )}
        </span>
      </button>

      {inputAmt !== '' && parseFloat(inputAmt) > 0 && showRepay && (
        <button
          disabled={true}
          className='relative mt-1 flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
        >
          <span className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-center align-middle text-inherit'>
            {`Repay ${assetName}`}
          </span>
        </button>
      )}
    </div>
  )
}

export default RepaySubmitButton
