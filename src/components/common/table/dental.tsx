const Dental = ({ percent }: { percent: number }) => {
  return <span className={`${percent > 0 ? 'text-[#00E585]' : 'text-red-600'}`}>{Math.abs(percent)}%</span>
}
export default Dental
