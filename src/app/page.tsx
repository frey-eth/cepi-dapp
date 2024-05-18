import AssetsToBorrow from '@/components/dashboard/assets-borrow'
import AssetsSupply from '@/components/dashboard/assets-supply'
import Borrow from '@/components/dashboard/borrow'
import Supply from '@/components/dashboard/supply'

const DashBoard = () => {
  return (
    <main className='mx-auto h-full w-full p-4 lg:mb-10 lg:w-[1288px] lg:py-5'>
      <section className='relative h-full w-full overflow-hidden rounded-2xl md:bg-[rgba(255,255,255,0.06)] md:p-4 md:backdrop-blur-[75px] lg:p-6'>
        <section className='relative h-full'>
          <h2 className='mb-6 text-2xl font-medium text-[#fff]'>Portfolio</h2>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <Supply />
            <Borrow />
            <AssetsSupply />
            <AssetsToBorrow />
          </div>
        </section>
      </section>
    </main>
  )
}

export default DashBoard
