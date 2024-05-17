import Dental from '@/components/common/table/dental'
import useModal from '@/hooks/useModal'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'

import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnDetail from '@/components/common/button/btn-detail'
import Image from 'next/image'
import { useMemo } from 'react'
import { AssetsBorrow } from '../../../types/table'

const useColumnsAssetBorrow = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<AssetsBorrow>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <span className=' gap-2 text-left'>Asset</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3 '>
              <figure>
                <Image src={icon} alt='icon' className='pt-[1px]' />
              </figure>
              <span className='mt-[1px] hidden font-helveticaNeue text-[14px] font-normal md:mt-[1px] md:block '>
                {name}
              </span>
              <div className=' flex flex-col items-start justify-start  text-left lg:hidden'>
                <div className='flex h-[20px] items-center pt-[2px] text-left text-[14px] leading-[14px]'>{name}</div>
                <div className='pt-[1px] md:hidden'>
                  <Dental percent={Number(info.row.original.apy)} />
                </div>
              </div>
            </div>
          )
        },
        sortingFn: (rowA, rowB) => rowB.original.asset.name.localeCompare(rowA.original.asset.name),
        footer: (props) => props.column.id,
      },
      {
        id: 'available',
        accessorKey: 'available',
        header: () => {
          return (
            <figure className='flex items-center justify-start gap-2 pl-4'>
              <span>Available</span>

              <div>
                <Image src={ic_alert} alt='icon alert' sizes='16' id='available' />
              </div>
            </figure>
          )
        },
        enableSorting: false,
        cell: (info) => {
          return (
            <figure className='flex w-[70px] items-center justify-start gap-2 pl-4'>
              <div className='flex flex-col items-start justify-start text-left md:flex-row md:items-center md:gap-2'>
                <span className='block text-left'>{Number(info.getValue())}</span>

                <div className='flex text-[#8F9399]'>
                  <div className='hidden md:flex'>{'('}</div>
                  <div>${Number(info.getValue())}</div>
                  <div className='hidden md:flex'>{')'}</div>
                </div>
              </div>
            </figure>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        id: 'apy',
        accessorKey: 'apy',
        header: () => {
          return (
            <figure className='hidden items-center justify-end gap-2 md:flex'>
              <span>APY, variable</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' id='apy' />
            </figure>
          )
        },
        enableSorting: false,
        cell: (info) => {
          return (
            <div className='hidden w-[70px] items-center justify-start gap-2 lg:flex'>
              <Dental percent={Number(info.getValue())} />
            </div>
          )
        },
        footer: (props) => props.column.id,
      },

      {
        id: 'btn',
        accessorKey: '',
        header: '',
        enableSorting: false,
        cell: (info) => {
          return (
            <div className=' flex items-center justify-end gap-2'>
              <BtnBorrow
                onClick={() => {
                  const data = info.row.original
                  handleOpenModal({
                    data: data,
                    type: 'borrow',
                  })
                }}
              />
              <BtnDetail />
            </div>
          )
        },
        footer: (props) => props.column.id,
      },
    ],
    [handleOpenModal]
  )

  return { columns, modalProps }
}

export default useColumnsAssetBorrow
