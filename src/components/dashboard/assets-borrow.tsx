'use client'
import Table from '@/components/common/table'
import { dataBorrow } from '@/data/asset-borrow/asset-borrow'
import { getDataColumnsAssetBorrow } from '@/data/column/columns-assets-borrow'
import tooltipData from '@/data/tooltip/tooltip-asset-borrow.json'
import bgAssets from '@/images/portfolio/assets-supply.png'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { AssetsBorrow, Type } from '../../../types/table'
import CustomTooltip from '../common/tooltip'

const ModalBorrow = dynamic(() => import('../common/modal/borrow'), {
  ssr: false,
})

const AssetsToBorrow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const [sorting, setSorting] = useState<SortingState>([])

  const onClickBorrow = useCallback(({ data, type }: { data: AssetsBorrow; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])

  const columnsData = useMemo(() => getDataColumnsAssetBorrow({ onClickBorrow }), [onClickBorrow])

  return (
    <>
      <div className='relative h-fit max-h-[340px] w-full rounded-lg border border-solid border-[#43434352] font-helveticaNeue md:border-none lg:h-[300px] '>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative   py-4 pl-4 md:mx-auto  md:px-4 md:py-2'>
          <div className='flex h-[50px] flex-col justify-between lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Borrow</h2>
          </div>

          <div className='table-custom h-[230px] w-full overflow-y-auto lg:h-[240px]'>
            <Table
              className='w-[350px] md:w-full'
              columns={columnsData}
              data={dataBorrow}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </div>
      </div>
      {isOpen && <ModalBorrow isOpen={isOpen} data={data} setIsOpen={setIsOpen} />}
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default AssetsToBorrow
