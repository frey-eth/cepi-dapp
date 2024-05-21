const BtnSupply = ({ onClick, className }: { onClick?: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-gradient-btn px-4 py-[10px] text-[14px] font-medium leading-[14px] text-[#000000] ${className}`}
    >
      Supply
    </button>
  )
}

export default BtnSupply
