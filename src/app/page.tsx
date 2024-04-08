import AssetsToBorrow from '@/components/dashboard/assets-borrow'
import AssetsSupply from '@/components/dashboard/assets-supply'
import Supply from '@/components/dashboard/supply'
import bgGlobalPool from '@/images/global-pool/Noise.png'
import Image from 'next/image'

const DashBoard = () => {
  return (
    <main className='mx-auto mb-10 h-full w-[1288px]'>
      <section className='relative h-full w-full overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.06)] p-6 backdrop-blur-lg'>
        <Image src={bgGlobalPool} alt='bg' fill priority />
        <section className='relative h-full'>
          <h2 className='mb-6 text-2xl font-medium text-[#fff]'>Portfolio</h2>
          <div className='grid grid-cols-2 gap-6'>
            <Supply type='supply' />
            <Supply type='borrow' />
            <AssetsSupply />
            <AssetsToBorrow />
          </div>
        </section>
      </section>
    </main>
  )
}

export default DashBoard
