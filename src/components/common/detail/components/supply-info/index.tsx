'use client'
import { supply_info_data } from '@/data/detail/detail-data'
import ic_tick from '@/icons/details/tick.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const timeData = ['1m', '6m', '1y']

const SupplyInfo = () => {
  const [time, setTime] = useState(timeData[0])
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>Supply info</h3>
        <div className='flex flex-row gap-10 max-sm:flex-col max-sm:gap-4 sm:items-center'>
          <div
            className='flex h-[82px] w-[82px] items-center justify-center rounded-full p-[6px]'
            style={{ background: `conic-gradient(#00E585 ${(360 * 75) / 100}deg, white 0deg)` }}
          >
            <div className='flex h-full w-full items-center justify-center rounded-full bg-[#0B0D10]  font-helveticaNeue text-[14px] font-medium leading-[14px]'>
              79.76%
            </div>
          </div>
          <div className='flex h-[60px] flex-row items-center gap-[26px]'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Total supplied <Image src={icAlert} alt='icon alert' sizes='16' id='total_supply' />
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
              <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>{`< 0.01%`}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
            <div className='h-[10px] w-[10px] rounded-full bg-[#00E585]' /> Supply APR
          </div>
          <div className='flex flex-row rounded-[8px] bg-[#18181B52] p-[6px]'>
            {timeData.map((item, index) => (
              <div
                key={index}
                onClick={() => setTime(item)}
                className={`rounded-[4px] ${time == item && 'bg-[#FFFFFF0A] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.16)_inset,_0px_0px_8px_0px_rgba(255,255,255,0.08)_inset]'} cursor-pointer p-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-white`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='h-[88px] w-full text-[12px] leading-[12px] text-[#A5A5B5] max-sm:h-[100px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={supply_info_data}
              margin={{
                top: 5,
                right: 5,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey='name' tickLine={false} />
              <YAxis width={40} axisLine={false} tickLine={false} />
              <Line type='monotone' dataKey='apr' stroke='#00E585' strokeWidth={2} dot={false} />
              <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#FFFFFF1A' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-3'>
            Collateral
            <div className='flex flex-row items-center gap-[6px] font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#00E585]'>
              <Image src={ic_tick} alt='tick' /> Can be collateral
            </div>
          </div>

          <div className='flex w-full flex-row flex-wrap gap-4 max-sm:flex-col sm:h-[54px] sm:items-center'>
            <div className='flex h-full flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Max LTV <Image src={icAlert} alt='icon alert' sizes='16' id='supply_ltv' />
              </div>
              78.50%
            </div>

            <div className='flex h-full flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Liquidation threshold <Image src={icAlert} alt='icon alert' sizes='16' id='supply_liq_threshold' />
              </div>
              81.00%{' '}
            </div>
            <div className='flex  h-full flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Liquidation penalty <Image src={icAlert} alt='icon alert' sizes='16' id='supply_liq_penalty' />
              </div>
              6.00%{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyInfo
