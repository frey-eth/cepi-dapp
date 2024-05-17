'use client'

import { dataAssetSupply } from '@/data/asset-supply/asset-supply'
import useColumnsAssetSupply from '@/data/column/colums-assets-supply'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import Checkbox from '../common/checkbox'
import { Modal } from '../common/modal'
import Table from '../common/table'
const AssetsSupply = () => {
  const [checked, setChecked] = useState(false)

  const { columns, modalProps } = useColumnsAssetSupply()

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <>
      <div className='relative h-[348px] w-full font-helveticaNeue lg:h-[300px]'>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative rounded-lg border border-solid border-[#43434352] py-4 pl-4 md:mx-auto md:border-none md:px-4 md:py-2'>
          <div className='flex flex-col justify-between md:h-[50px] lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Supply</h2>
            <div className='my-4 flex items-center space-x-3'>
              <Checkbox checked={checked} setChecked={setChecked} />
              <span className='text-sm font-normal text-[#8F9399]'>Show assets with 0 balance</span>
            </div>
          </div>

          <div className=' table-custom2 h-[230px] w-full overflow-y-auto lg:h-[240px]'>
            <Table
              className='w-[576px] md:w-full'
              columns={columns}
              data={dataAssetSupply}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </div>
      </div>
      <Modal {...modalProps} />
    </>
  )
}

export default AssetsSupply
