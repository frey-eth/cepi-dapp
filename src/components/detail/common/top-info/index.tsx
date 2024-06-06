import ic_share from '@/icons/details/share.svg'
import Image from 'next/image'
type TopInfoProps = {
  symbol: string
  title: string
  value: string
  link?: string
}

const TopInfo = ({ symbol, value, title, link }: TopInfoProps) => {
  return (
    <div className='flex h-[36px] flex-col gap-[6px] text-[14px] font-medium leading-[14px] text-[#A5A5B5]'>
      {title}
      <div className='flex flex-row items-center gap-2'>
        <div className='flex flex-row items-center gap-1 text-[16px] leading-[16px] text-white'>
          {symbol === '$' ? (
            <>
              <span className='text-[#A5A5B5]'>{symbol}</span>
              {value}
            </>
          ) : (
            <>
              <span className='text-[#A5A5B5]'>{value}</span>
              {symbol}
            </>
          )}
        </div>

        {link && (
          <div className='flex h-5 w-5 items-center justify-center gap-[8px] overflow-hidden rounded-full bg-[#FFFFFF1A] p-[1px]'>
            <Image src={ic_share} alt='share' objectFit='cover' className='h-[11px] w-[11px]' />
          </div>
        )}
      </div>
    </div>
  )
}

export default TopInfo
