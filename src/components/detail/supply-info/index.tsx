'use client'
import { generateFakeAPRData } from '@/data/detail/detail-data'
import ic_tick from '@/icons/details/tick.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import CircleChart from '../../common/circle-chart/index.jsx'
import DataPercent from '../common/data_percent'
const timeData = ['1m', '6m', '1y']
const DataPercentInFo = [
  { title: 'Max LTV', percent: 78.5, id: 'supply_ltv' },
  { title: 'Liquidation threshold', percent: 81, id: 'supply_liq_threshold' },
  { title: 'Liquidation penalty', percent: 6, id: 'supply_liq_penalty' },
]

const SupplyInfo = () => {
  const [time, setTime] = useState(timeData[0])
  const data = useMemo(() => generateFakeAPRData(time), [time])
  const yAxisTickFormatter = (value: number) => `${value}%`
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>Supply info</h3>
        <div className='flex flex-row items-center gap-10 max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-4'>
          <CircleChart value={75.6} />
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
            {timeData.map((item) => (
              <div
                key={item}
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
              data={data}
              margin={{
                top: 5,
                right: 5,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey='name' tickLine={false} />
              <YAxis width={50} axisLine={false} tickLine={false} tickFormatter={yAxisTickFormatter} />
              <Line type='monotone' dataKey='apr' stroke='#00E585' strokeWidth={2} dot={false} />
              <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#FFFFFF1A' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-3 text-[14px] font-medium leading-[14px]'>
            Collateral
            <div className='flex flex-row items-center gap-[6px] text-[#00E585]'>
              <Image src={ic_tick} alt='tick' /> Can be collateral
            </div>
          </div>

          <div className='flex w-full flex-row flex-wrap gap-4 max-[1024px]:flex-col sm:items-center'>
            {DataPercentInFo.map((item) => (
              <DataPercent key={item.id} title={item.title} percent={item.percent} id={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyInfo
