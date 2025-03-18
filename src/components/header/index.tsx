'use client'
import logo from '@/images/header/cepi.png'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BtnConnect from '../common/button/btn-connect'

const menus = [
  {
    id: 1,
    title: 'Dashboard',
    href: '/',
  },
  {
    id: 2,
    title: 'Loans',
    href: '/loans',
  },
]

const Header = () => {
  const pathname = usePathname()

  return (
    <main>
      <section className='mx-auto flex h-[72px] w-full items-center justify-between px-4 py-4 lg:max-w-[1440px] lg:px-[100px]'>
        <section className='flex w-[752px] items-center gap-x-10'>
          <Link href={'/'}>
            <figure>
              <Image src={logo} alt='logo' width={44} height={44} />
            </figure>
          </Link>

          <nav className='hidden items-center space-x-4 lg:flex'>
            {menus.map((item, index) => {
              return (
                <Link href={item.href} key={index} className='group relative px-4 py-2'>
                  <span className='text-base font-medium text-[#FFFFFF]'>{item.title}</span>
                  <span
                    className={`absolute bottom-0 left-0 block h-[2px] ${item.href !== pathname ? 'w-0 group-hover:w-full' : 'w-full'} bg-[#ED048A] transition-all duration-150 ease-linear `}
                  ></span>
                </Link>
              )
            })}
          </nav>
        </section>
        <section className='flex items-center space-x-4'>
          <BtnConnect />
        </section>
      </section>
    </main>
  )
}
export default Header
