'use client'
import Table from '@/components/common/table'
import CustomTooltip from '@/components/common/tooltip'
import { getDataColumnsLending } from '@/data/column/columns-lend-loan'
import { dataLending } from '@/data/global-pool/global-pool-data'
import tooltipData from '@/data/tooltip/tooltip.json'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { DataModalType } from '../../../types/modal'
import { GlobalPool, Type } from '../../../types/table'

const ModalSupply = dynamic(() => import('../common/modal/supply/supply-modal'), {
  ssr: false,
})

const Lending = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<DataModalType | undefined>()

  const onClickSupply = useCallback(({ data, type }: { data: GlobalPool; type: Type }) => {
    if (!data) return
    setData({ data: data, type: type })
    setIsOpen(true)
  }, [])

  const columnsData = useMemo(() => getDataColumnsLending({ onClickSupply }), [onClickSupply])

  return (
    <>
      <Table
        hasResponsive
        columns={columnsData}
        data={dataLending}
        className='custom-table relative w-[1000px] lg:w-full'
      />

      {isOpen && <ModalSupply isOpen={isOpen} data={data} setIsOpen={setIsOpen} />}
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default Lending
