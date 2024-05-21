'use client'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement)

const TotalDetails = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [75, 50],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      },
    ],
  }
  return (
    <div className='flex flex-col gap-8 rounded-2xl border border-[#00000052] bg-[#0B0D10CC] p-6'>
      <div className='flex flex-col gap-6'>
        <h3 className='text-[16px] font-medium leading-[16px] text-white'>Reserve status & configuration</h3>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h3 className=' text-[14px] font-medium leading-[14px]'>Supply info</h3>
            <div className='flex flex-row gap-10'>
              <div className='h-[82px] w-[82px]'>
                <Doughnut data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalDetails
