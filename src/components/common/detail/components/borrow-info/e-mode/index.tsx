import Image from 'next/image'
import icAlert from '@/images/table/alert-circle-light.svg'

const Emode = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h3 className=' text-[14px] font-medium leading-[14px]'>Borrow info</h3>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>E-Mode Category</h3>
        <div className='flex flex-row gap-4 max-sm:flex-col'>
          <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
            <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
              Max LTV <Image src={icAlert} alt='icon alert' sizes='16' id='supply_ltv' />
            </div>
            90.00%{' '}
          </div>
          <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
            <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
              Liquidation threshold <Image src={icAlert} alt='icon alert' sizes='16' id='supply_liq_threshold' />
            </div>
            15.00%
          </div>
          <div className='flex  h-[54px] flex-1 flex-col justify-center gap-[6px] rounded-lg border border-[#43434352] p-[8px] text-[16px] font-medium leading-[16px]'>
            <div className='flex flex-row items-center gap-2 text-[14px] font-light leading-[14px] text-[#A5A5B5]'>
              Liquidation penalty <Image src={icAlert} alt='icon alert' sizes='16' id='supply_liq_penalty' />
            </div>
            2.00%
          </div>
        </div>
        <p className='text-[12px] font-light leading-[12px] text-[#A5A5B5]'>
          E-Mode increases your LTV for a selected category of assets, meaning that when E-mode is enabled, you will
          have higher borrowing power over assets of the same E-mode category which are defined by BlonkFi. You can
          enter E-Mode from your Dashboard. To learn more about E-Mode and applied restrictions in FAQ or BlonkFi.
        </p>
      </div>
    </div>
  )
}

export default Emode
