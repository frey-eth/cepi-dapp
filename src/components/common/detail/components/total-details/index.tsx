'use client'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'

const TotalDetails = () => {
  return (
    <div className='flex flex-1 flex-col gap-8 rounded-2xl border border-[#00000052] bg-[#0B0D10CC] p-6'>
      <div className='flex flex-col gap-6'>
        <h3 className='text-[16px] font-medium leading-[16px] text-white'>Reserve status & configuration</h3>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h3 className=' text-[14px] font-medium leading-[14px]'>Supply info</h3>
            <div className='flex flex-row items-center gap-10'>
              <div className='h-[82px] w-[82px]'>{/* <Doughnut data={data} /> */}</div>
              <div className='flex h-[60px] flex-row items-center gap-[26px]'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                    Total supplied <Image src={icAlert} alt='icon alert' sizes='16' id='apy' />
                  </div>
                  <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>
                    996.99k of 1.25M
                  </div>

                  <p className='font-helveticaNeue text-[12px] font-light leading-[12px] text-[#A5A5B5]'>
                    $ 3.58B of 4.49B
                  </p>
                </div>

                <div className='h-5 border border-[#FFFFFF1A]' />

                <div className='flex h-full flex-col gap-2'>
                  <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                    APY{' '}
                  </div>
                  <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>
                    {`< 0.01%`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalDetails
