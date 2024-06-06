import ViewDetail from '@/components/detail'

export default function Detail() {
  return (
    <div className='mx-auto h-full w-full p-4 lg:mb-10 lg:w-[1288px] lg:py-5'>
      <section className='relative h-full w-full overflow-hidden rounded-2xl md:bg-[rgba(255,255,255,0.06)] md:p-4 md:backdrop-blur-[75px] lg:p-6'>
        <ViewDetail />
      </section>
    </div>
  )
}
