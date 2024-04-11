import menuIcon from '@/images/header/menu.svg'
import Image from 'next/image'
const BtnMenu = () => {
  return (
    <button className='h-8 w-8'>
      <Image src={menuIcon} alt='menu' />
    </button>
  )
}

export default BtnMenu
