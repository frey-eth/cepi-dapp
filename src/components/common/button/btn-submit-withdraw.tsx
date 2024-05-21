import spinner from '@/images/modal/spinner.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type SubmitButtonProps = {
  inputAmt: string
  assetName: string

  setIsSuccess: (value: boolean) => void
}
const WithdrawSubmitButton = ({ inputAmt, setIsSuccess, assetName }: SubmitButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = () => {
    try {
      setIsLoading(true)
    } catch (error) {
      console.log('Log - error:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)
      }, 3000)
    }
  }
  useEffect(() => {
    if (parseFloat(inputAmt) > 0 && inputAmt !== '') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [inputAmt])

  return (
    <button
      type='submit'
      className='relative flex h-10 w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,_#EB1088_0%,_#FF6517_100%)] py-3 transition-all duration-300 hover:opacity-80 disabled:opacity-50 disabled:hover:opacity-50'
      onClick={handleSubmit}
      disabled={isLoading || inputAmt === '' || parseFloat(inputAmt) === 0}
    >
      <span
        className='absolute left-0 top-0 flex size-full items-center justify-center text-center align-middle text-inherit transition-all duration-300'
        style={{ scale: isLoading ? 0 : 1 }}
      >
        {inputAmt === '' || parseFloat(inputAmt) === 0 ? 'Enter an amount' : `Withdraw ${assetName} `}
        <Image
          src={spinner}
          alt='setting'
          width={24}
          height={24}
          className='animate-spin object-cover transition-all duration-300'
          style={{
            scale: isLoading ? 1 : 0,
          }}
        />
      </span>
      <Image
        src={spinner}
        alt='setting'
        width={24}
        height={24}
        className='animate-spin object-cover transition-all duration-300'
        style={{
          scale: isLoading ? 1 : 0,
        }}
      />
    </button>
  )
}

export default WithdrawSubmitButton
