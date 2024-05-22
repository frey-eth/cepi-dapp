'use client'

import { dataAssetSupply } from '@/data/asset-supply/asset-supply'
import { getDataColumnsAssetSupply } from '@/data/column/columns-assets-supply'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { AssetSupply, Type } from '../../../types/table'
import Checkbox from '../common/checkbox'
import Table from '../common/table'

const ModalSupply = dynamic(() => import('../common/modal/supply'), {
  ssr: false,
})

const AssetsSupply = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const [sorting, setSorting] = useState<SortingState>([])

  const onClickSupply = useCallback(({ data, type }: { data: AssetSupply; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])
  const columnsData = useMemo(() => getDataColumnsAssetSupply({ onClickSupply }), [onClickSupply])

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
              className='w-[576px] min-[600px]:w-full md:w-full'
              columns={columnsData}
              data={dataAssetSupply}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </div>
      </div>
      {isOpen && <ModalSupply isOpen={isOpen} data={data} setIsOpen={setIsOpen} />}
    </>
  )
}

export default AssetsSupply
