import telegramIcon from '@/icons/footer/telegram.svg'
import xIcon from '@/icons/footer/x.svg'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='flex h-8 flex-wrap items-center justify-center gap-4 px-4 py-4  pb-10 max-sm:hidden lg:justify-between lg:gap-0 lg:px-[100px]'>
      <div className='flex items-center gap-4 lg:gap-10' />
      <div className='flex items-center gap-4'>
        <Link href={`https://x.com/cepinetwork`} target='_blank'>
          <Image src={xIcon} alt='twitter icon' />
        </Link>
        <Link href={`https://t.me/cepinetwork`} target='_blank'>
          <Image src={telegramIcon} alt='telegram icon' />
        </Link>
      </div>
    </div>
  )
}

export default Footer
