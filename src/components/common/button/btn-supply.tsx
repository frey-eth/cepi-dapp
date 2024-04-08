const BtnSupply = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button onClick={onClick} className='rounded-lg bg-[#fff] px-4 py-[10px] text-[#000]'>
      Supply
    </button>
  )
}

export default BtnSupply
