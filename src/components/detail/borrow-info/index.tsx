'use client'
import ic_share from '@/icons/details/share.svg'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Emode from './e-mode'
import InterestRateModel from './interest-rate-model'

const timeData = ['1m', '6m', '1y']

const AverageLabel = ({ value }: { value: number }) => {
  return (
    <foreignObject x={100} y={15} width={72} height={18}>
      <div className='flex h-[18px] w-[72px] items-center justify-center whitespace-nowrap rounded-full bg-white px-[6px] py-1 font-helveticaNeue text-[11px] font-semibold leading-[11px] text-[#262626]'>
        Avg {Math.round(value * 100) / 100}%
      </div>
    </foreignObject>
  )
}

const yAxisTickFormatter = (value: number) => `${value}%`

const BorrowInfo = () => {
  const [time, setTime] = useState(timeData[0])
  const data = useMemo(() => {
    return [
      {
        name: 'Apr 21',
        apr: 0,
      },
      {
        name: 'Apr 28',
        apr: 0.2,
      },
      {
        name: 'May 05',
        apr: 0,
      },
      {
        name: 'May 12',
        apr: 0.4,
      },
      {
        name: 'May 19',
        apr: 0.02,
      },
    ]
  }, [])

  const averageAPR = useMemo(() => {
    const totalAPR = data.reduce((sum, entry) => sum + entry.apr, 0)
    return totalAPR / data.length
  }, [data])

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>Borrow info</h3>
        <div className='flex flex-row items-center gap-10 max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-4'>
          <div
            className='flex h-[82px] w-[82px] items-center  justify-center rounded-full p-[6px]'
            style={{ background: `conic-gradient(#00E585 ${(360 * 26) / 100}deg, white 0deg)` }}
          >
            <div className='flex h-full w-full items-center justify-center rounded-full bg-[#0B0D10]  font-helveticaNeue text-[14px] font-medium leading-[14px]'>
              26.60%
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-[26px] max-[1024px]:items-start'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Total borrowed <Image src={icAlert} alt='icon alert' sizes='16' id='total_borrow' />
              </div>
              <div className='font-helveticaNeue text-[16px] font-medium leading-[16px] text-white'>
                6,624.88 of 24,000.00
              </div>

              <p className='font-helveticaNeue text-[12px] font-light leading-[12px] text-[#A5A5B5]'>
                $ 3.58B of 4.49B
              </p>
            </div>

            <div className='h-5 border border-[#FFFFFF1A]' />

            <div className='flex  flex-col gap-2'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                APY, Variable <Image src={icAlert} alt='icon alert' sizes='16' id='apy_variable' />
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
                className={`rounded-[4px] ${time == item && 'bg-[#FFFFFF0A] shadow-[1px_1px_0px_0px_rgba(255,255,255,0.16)_inset,_0px_0px_8px_0px_rgba(255,255,255,0.08)_inset]'} cursor-pointer p-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-white `}
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
              <Line dot={false} type='monotone' dataKey='apr' stroke='#EE0D85' strokeWidth={2} />
              <ReferenceLine y={averageAPR} stroke='#FFFFFF99' strokeDasharray='4 5'>
                <Label position={'top'} content={<AverageLabel value={averageAPR} />} />
                <Tooltip />
              </ReferenceLine>
              <CartesianGrid strokeDasharray='3 3' stroke='#FFFFFF1A' vertical={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-row items-center gap-3'>Collector Info</div>

          <div className='flex flex-row items-center gap-4 '>
            <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
                Reserve factor <Image src={icAlert} alt='icon alert' sizes='16' id='reserve_factor' />
              </div>
              15.00%
            </div>

            <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px] text-[#A5A5B5]'>
              <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] '>
                Collector Contract
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
