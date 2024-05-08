const BtnSupply = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='flex h-[36px] w-[78px] items-center justify-center rounded-lg bg-gradient-btn text-[14px] font-medium leading-[14px] text-[#000000] md:w-[100px]'
    >
      Supply
    </button>
  )
}

export default BtnSupply
