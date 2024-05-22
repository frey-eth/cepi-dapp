import ic_share from '@/icons/details/share.svg'
import Image from 'next/image'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type TooltipType = {
  value: number
  color: string
  name: string
  dataKey: string
  payload: {
    name: string
    apr: string
  }
}

const data = [
  {
    name: '0%',
    apr: 0,
  },
  {
    name: '25%',
    apr: 0,
  },
  {
    name: '50%',
    apr: 0,
  },
  {
    name: '75%',
    apr: 0,
  },
  {
    name: '100%',
    apr: 0.02,
  },
]

const CustomTooltip = ({ active, payload }: { active: boolean; payload?: TooltipType[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-[12px] leading-[12px] text-[#A5A5B5]'>{`Current : ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

const InterestRateModel = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className=' text-[14px] font-medium leading-[14px]'>Borrow info</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col gap-2 font-helveticaNeue text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
            Utilization Rate
            <p className='text-[16px] font-medium leading-[16px] text-white'>78.61%</p>
          </div>

          <div className='flex  flex-row items-center gap-2 rounded border border-[#43434352] bg-[#FFFFFF1A] p-2 font-helveticaNeue text-[14px] font-light leading-[14px]'>
            Interest rate strategy
            <Image src={ic_share} alt='share' objectFit='cover' className='h-[12px] w-[12px]' />
          </div>
        </div>

        <div className='flex flex-row items-center gap-6'>
          <div className='flex flex-row items-center gap-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
            <div className='h-[10px] w-[10px] rounded-full bg-[#EE0D85]' /> Borrow APR, variable
          </div>

          <div className='flex flex-row items-center gap-2 font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
            <div className='h-[10px] w-[10px] rounded-full bg-[#00E585]' /> Utilization Rate
          </div>
        </div>

        <div className='h-[144px] w-full text-[12px] leading-[12px] text-[#A5A5B5]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                bottom: 5,
              }}
            >
              <Tooltip
                content={<CustomTooltip active />}
                cursor={{ stroke: '#5D61BCCC', strokeWidth: 1, strokeDasharray: '3 3' }}
              />

              <XAxis axisLine={false} dataKey='name' tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Line dot={false} dataKey='apr' stroke='#EE0D85' strokeWidth={2} />
              <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#FFFFFF1A' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default InterestRateModel
