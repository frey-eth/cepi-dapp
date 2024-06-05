import DataPercent from '../../common/data_percent'

const Emode = () => {
  return (
    <div className='flex flex-col gap-6 font-helveticaNeue'>
      <div className='flex flex-col gap-4'>
        <h3 className=' text-[14px] font-medium leading-[14px]'>E-Mode Category</h3>
        <div className='flex flex-row gap-4 whitespace-nowrap max-[1024px]:flex-col'>
          <DataPercent title='Max LTV' percent={90} id='supply_ltv' />
          <DataPercent title='Liquidation threshold' percent={93} id='supply_liq_threshold' />
          <DataPercent title='Liquidation penalty' percent={2} id='supply_liq_penalty' />
        </div>
        <p className='text-[12px] font-light leading-[16px] text-[#A5A5B5]'>
          E-Mode increases your LTV for a selected category of assets, meaning that when E-mode is enabled, you will
          have higher borrowing power over assets of the same E-mode category which are defined by BlonkFi. You can
          enter E-Mode from your <span className='cursor-pointer underline'>Dashboard</span>. To learn more about E-Mode
          and applied restrictions in <span className='cursor-pointer underline'>FAQ</span> or BlonkFi.
        </p>
      </div>
    </div>
  )
}

export default Emode
