'use client'
import icAlert from '@/images/table/alert-circle-light.svg'
import Image from 'next/image'
import CustomTooltip from '../tooltip'
interface ITopInformation {
  title: string
  value: string
  tooltip_content?: string
  tooltip_id?: string
}
const TopInformation = ({ title, value, tooltip_content, tooltip_id }: ITopInformation) => {
  return (
    <>
      <div className='flex h-[26px] flex-row  items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[118px]  min-[320px]:gap-x-[10px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
        <span className=' font-medium leading-[14px] text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
          {title}
        </span>
        <span className=' font-medium leading-[14px] text-white max-sm:text-[12px] min-[325px]:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
          {value}
        </span>
        {tooltip_id && <Image src={icAlert} alt='icAlert' width={14} height={14} className='mb-[1px]' />}
      </div>

      {tooltip_id && <CustomTooltip id={tooltip_id} content={String(tooltip_content)} />}
    </>
  )
}

export default TopInformation
