import { useEffect, useRef, useState } from 'react'

type CircleChartProps = {
  value: number
}

const CircleChart = ({ value }: CircleChartProps) => {
  const [progress, setProgress] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startValue = 0
          const increment = value / 100
          const interval = setInterval(() => {
            startValue += increment
            if (startValue >= value) {
              startValue = value
              clearInterval(interval)
            }
            setProgress(startValue)
          }, 10)

          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (circleRef.current) {
      observer.observe(circleRef.current)
    }

    return () => {
      if (circleRef.current) {
        //eslint-disable-next-line
        observer.unobserve(circleRef.current)
      }
    }
  }, [value])

  return (
    <div
      ref={circleRef}
      className='flex h-[82px] w-[82px] items-center justify-center rounded-full p-[6px]'
      style={{ background: `conic-gradient(#00E585 ${(360 * progress) / 100}deg, white 0deg)` }}
    >
      <div className='flex h-full w-full items-center justify-center rounded-full bg-[#0B0D10] font-helveticaNeue text-[14px] font-medium leading-[14px]'>
        {progress.toFixed(1)}%
      </div>
    </div>
  )
}

export default CircleChart
