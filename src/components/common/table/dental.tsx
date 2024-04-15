const Dental = ({ percent }: { percent: number }) => {
  return (
    <p className={`${percent > 0 ? 'text-[#00E585]' : 'text-red-600'} min-w-[50px] text-left`}>{Math.abs(percent)}%</p>
  )
}
export default Dental
