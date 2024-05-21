'use client'
import ic_share from '@/icons/details/share.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Emode from './e-mode'
import InterestRateModel from './interest-rate-model'

const timeData = ['1m', '6m', '1y']
const data = [
  {
    name: 'Apr 21',
    apr: 0,
  },
  {
    name: 'Apr 28',
    apr: 0.1,
  },
  {
    name: 'May 05',
    apr: 0,
  },
  {
    name: 'May 12',
    apr: 0.1,
  },
  {
    name: 'May 19',
    apr: 0.02,
  },
]

const BorrowInfo = () => {
  const [time, setTime] = useState(timeData[0])
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>Borrow info</h3>
        <div className='flex flex-row items-center gap-10'>
          <div
            className='flex h-[82px] w-[82px] items-center justify-center rounded-full p-[6px]'
            style={{ background: `conic-gradient(#00E585 ${(360 * 26) / 100}deg, white 0deg)` }}
          >
            <div className='flex h-full w-full items-center justify-center rounded-full bg-[#0B0D10]  font-helveticaNeue text-[14px] font-medium leading-[14px]'>
              26.60%
            </div>
          </div>
          <div className='flex h-[60px] flex-row items-center gap-[26px]'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Total borrowed <Image src={icAlert} alt='icon alert' sizes='16' id='apy' />
              </div>
              <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>
                6,624.88 of 24,000.00
              </div>

              <p className='font-helveticaNeue text-[12px] font-light leading-[12px] text-[#A5A5B5]'>
                $ 3.58B of 4.49B
              </p>
            </div>

            <div className='h-5 border border-[#FFFFFF1A]' />

            <div className='flex h-full flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                APY, Variable
              </div>
              <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>{`< 0.01%`}</div>
            </div>

            <div className='h-5 border border-[#FFFFFF1A]' />

            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Borrow cap
              </div>
              <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>24,000.00 </div>

              <p className='font-helveticaNeue text-[12px] font-light leading-[12px] text-[#A5A5B5]'>$86.62M </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
            <div className='h-[10px] w-[10px] rounded-full bg-[#EE0D85]' /> Borrow APR, variable
          </div>
          <div className='flex flex-row rounded-[8px] bg-[#18181B52] p-[6px]'>
            {timeData.map((item, index) => (
              <div
                key={index}
                onClick={() => setTime(item)}
                className={`rounded-[4px] ${time == item && 'bg-[#FFFFFF0A]'} cursor-pointer p-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-white ${time == item && 'shadow-button'}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='h-[88px] w-full text-[12px] leading-[12px] text-[#A5A5B5]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey='name' tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Line dot={false} type='monotone' dataKey='apr' stroke='#EE0D85' strokeWidth={2} />
              <CartesianGrid strokeDasharray='3 3' stroke='#FFFFFF1A' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-3'>Collector Info</div>

          <div className='flex flex-row items-center gap-4'>
            <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Reserve factor <Image src={icAlert} alt='icon alert' sizes='16' id='apy' />
              </div>
              15.00%
            </div>

            <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Collector Contract <Image src={icAlert} alt='icon alert' sizes='16' id='apy' />
              </div>
              <div className='flex flex-row items-center gap-2'>
                View contract
                <Image src={ic_share} alt='share' objectFit='cover' className='h-[12px] w-[12px]' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-full border border-[#FFFFFF1A]' />
      <Emode />
      <div className='h-full border border-[#FFFFFF1A]' />
      <InterestRateModel />
    </div>
  )
}

export default BorrowInfo
