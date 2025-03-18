import Footer from '@/components/footer'
import Header from '@/components/header'
import SolanaProvider from '@/provider/solana-provider'
import '@/styles/index.scss'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import BottomNavigation from '@/components/common/bottom-navigation'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { Suspense } from 'react'
import './globals.css'
const monaSans = localFont({
  src: [
    {
      path: '../../public/fonts/Mona-Sans-Light.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/Mona-Sans-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mona-Sans-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/Mona-Sans-SemiBold.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../../public/fonts/Mona-Sans-Bold.woff2',
      weight: '700',
      style: 'Bold',
    },
  ],
  variable: '--font-mona-sans',
  display: 'swap',
})
export const metadata: Metadata = {
  applicationName: 'Cepi Network',
  title: 'Cepi Network',
  description: 'Cepi Network',
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_APP_HOST)),
  openGraph: {
    title: 'Global pool Cepi Network',
    description: 'Global pool Cepi Network',
    siteName: 'Cepi Network',
    url: String(process.env.NEXT_PUBLIC_APP_HOST),
    type: 'website',
  },
  manifest: './manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cepi Network',
  },
  formatDetection: {
    telephone: false,
  },
}
export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`relative h-screen overflow-hidden font-mono ${monaSans.variable}`}>
        <FlickeringGrid color='violet' className='absolute inset-0 z-[-1] bg-gray-900 ' />
        <SolanaProvider>
          <main className='relative h-full overflow-y-scroll'>
            <Header />
            <section className='h-fit max-sm:mb-[64px] lg:min-h-[calc(100vh-130px)]'>
              <Suspense>{children}</Suspense>
            </section>
            <Footer />
            <BottomNavigation />
          </main>
        </SolanaProvider>
      </body>
    </html>
  )
}
