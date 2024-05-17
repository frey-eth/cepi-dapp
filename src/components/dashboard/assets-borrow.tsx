'use client'
import Table from '@/components/common/table'
import { dataBorrow } from '@/data/asset-borrow/asset-borrow'
import useColumnsAssetBorrow from '@/data/column/colums-assets-borrow'
import tooltipData from '@/data/tooltip/tooltip-asset-borrow.json'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { Modal } from '../common/modal'
import CustomTooltip from '../common/tooltip'

const AssetsToBorrow = () => {
  const { columns, modalProps } = useColumnsAssetBorrow()

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <>
      <div className='relative h-fit max-h-[340px] w-full rounded-lg border border-solid border-[#43434352] font-helveticaNeue  md:border-none  lg:h-[300px] '>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative   py-4 pl-4 md:mx-auto  md:px-4 md:py-2'>
          <div className='flex h-[50px] flex-col justify-between lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Borrow</h2>
          </div>

          <div className='table-custom h-[230px] w-full overflow-y-auto lg:h-[240px]'>
            <Table
              className='w-[350px] md:w-full'
              columns={columns}
              data={dataBorrow}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </div>
      </div>
      <Modal {...modalProps} />
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default AssetsToBorrow
