import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'

type DataPercentProps = {
  title: string
  percent: number
  id: string
}

const DataPercent = ({ title, percent, id }: DataPercentProps) => {
  return (
    <div className='flex w-full flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
      <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
        {title} <Image src={icAlert} alt='icon alert' sizes='16' id={id} />
      </div>
      {percent.toFixed(2)}%
    </div>
  )
}
export default DataPercent
