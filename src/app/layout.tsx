import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import bgLayout from '@/images/layout/bg-layout.png'
import SolanaProvider from '@/provider/solana-provider'
import '@/styles/index.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
// import Image from 'next/image'
import BottomNavigation from '@/components/common/bottom_navigation'
import Image from 'next/image'
import './globals.css'
const monaSans = localFont({
  src: [
    {
      path: '../../public/font/Mona-Sans-Light.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/font/Mona-Sans-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/font/Mona-Sans-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/font/Mona-Sans-SemiBold.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../public/font/Mona-Sans-Bold.woff2',
      weight: '700',
      style: 'Bold',
    },
  ],
  variable: '--font-mona-sans',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Blonkfi',
  description: 'Blonkfi',
  metadataBase: new URL(String(process.env.REACT_APP_HOST)),
  openGraph: {
    title: 'Blonkfi',
    description: 'Blonkfi',
    siteName: 'Blonkfi',
    url: String(process.env.REACT_APP_HOST),
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`font-mona_sans ${monaSans.className} relative h-full min-h-screen`}>
        <Image src={bgLayout} objectPosition='bottom' alt='background' fill priority />
        <SolanaProvider>
          <main className='relative'>
            <Header />
            <section className='h-fit lg:min-h-[calc(100vh-130px)]'>{children}</section>
            <Footer />
            <BottomNavigation />
          </main>
        </SolanaProvider>
      </body>
    </html>
  )
}
