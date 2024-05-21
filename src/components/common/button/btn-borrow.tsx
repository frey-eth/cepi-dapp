const BtnBorrow = ({ onClick, className }: { onClick?: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-gradient-btn px-4 py-[10px] text-[14px] leading-[14px] text-[#000] ${className}`}
    >
      Borrow
    </button>
  )
}

export default BtnBorrow
