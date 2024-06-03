'use client'
import Table from '@/components/common/table'
import { dataBorrow } from '@/data/asset-borrow/asset-borrow'
import { getDataColumnsAssetBorrow } from '@/data/column/columns-assets-borrow'
import tooltipData from '@/data/tooltip/tooltip-asset-borrow.json'
import bgAssets from '@/images/table/bg-table.svg'
import { SortingState } from '@tanstack/react-table'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'

import CustomTooltip from '../common/tooltip'
import useUrlParams from '@/hooks/useSearchParams'
import { useRouter } from 'next/navigation'
import { DataModalType } from '@/types/modal'
import { AssetsBorrow, Type } from '@/types/table'

const ModalBorrow = dynamic(() => import('../common/modal/borrow'), {
  ssr: false,
})

const AssetsToBorrow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()
  const [sorting, setSorting] = useState<SortingState>([])
  const { createQueryString } = useUrlParams()
  const router = useRouter()

  const onClickBorrow = useCallback(({ data, type }: { data: AssetsBorrow; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])

  const onClickDetails = useCallback(
    ({ data }: { data: AssetsBorrow }) => {
      if (!data) return
      const query = createQueryString('asset', data.asset.name)
      router.push('detail/' + '?' + query)
    },
    [createQueryString, router]
  )

  const columnsData = useMemo(
    () => getDataColumnsAssetBorrow({ onClickBorrow, onClickDetails }),
    [onClickBorrow, onClickDetails]
  )

  return (
    <>
      <div className='relative h-[348px] w-full overflow-hidden rounded-lg border border-solid  border-[#43434352] bg-[rgba(11,13,16,0.8)] font-helveticaNeue md:border-[#252B3D26] lg:h-[300px]'>
        <Image src={bgAssets} alt='background' fill priority objectFit='cover' />
        <div className='relative rounded-lg border border-solid border-[#43434352] py-4 pl-4 md:mx-auto md:border-none md:px-4 md:py-2'>
          <div className='flex flex-col justify-between md:h-[50px] lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Borrow</h2>
          </div>

          <div className='table-custom h-[230px] w-full overflow-y-auto lg:h-[240px]'>
            <Table
              className='w-[350px] min-[500px]:w-full md:w-full'
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
