const BtnSupply = ({
  onClick,
  className,
  disabled,
}: {
  onClick?: () => void
  className?: string
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={`rounded-lg bg-gradient-btn px-4 py-[10px] font-helveticaNeue text-[14px] font-medium leading-[14px] text-[#262626] ${className}`}
    >
      Supply
    </button>
  )
}

export default BtnSupply
