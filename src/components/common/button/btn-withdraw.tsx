const BtnWithdraw = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='rounded-lg bg-gradient-btn px-4 py-[10px] text-[14px] font-medium leading-[14px] text-[#000000]'
    >
      Withdraw
    </button>
  )
}

export default BtnWithdraw
