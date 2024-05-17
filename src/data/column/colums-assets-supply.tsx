import Dental from '@/components/common/table/dental'
import useModal from '@/hooks/useModal'
import ic_alert from '@/icons/alert-triangle-light.svg'
import { ColumnDef } from '@tanstack/react-table'

import BtnSupply from '@/components/common/button/btn-supply'
import icCheck from '@/images/portfolio/check.svg'
import Image from 'next/image'
import { useMemo } from 'react'
import { AssetSupply } from '../../../types/table'

const useColumnsAssetSupply = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<AssetSupply>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <span className=' gap-2 text-left'>Asset</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start  space-x-3 '>
              <figure>
                <Image src={icon} alt='icon' className='pt-[1px] md:pt-[1px]' />
              </figure>
              <span className='mt-[1px] font-helveticaNeue text-[14px] font-normal md:mt-[1px] '>{name}</span>
            </div>
          )
        },
        sortingFn: (rowA, rowB) => rowB.original.asset.name.localeCompare(rowA.original.asset.name),
        footer: (props) => props.column.id,
      },
      {
        id: 'walletBalance',
        accessorKey: 'walletBalance',
        header: () => {
          return <span>Wallet balance</span>
        },
        cell: (info) => {
          const { isError } = info.row.original
          return (
            <figure>
              <div className='flex w-[70px] items-center justify-start gap-2 space-x-2'>
                <span className='block text-left'>{Number(info.getValue())}</span>
                {isError && <Image src={ic_alert} alt='alert' />}
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
          return <span>APY</span>
        },
        cell: (info) => <Dental percent={Number(info.getValue())} />,
        footer: (props) => props.column.id,
      },
      {
        id: 'isCollateral',
        accessorKey: 'isCollateral',

        header: () => {
          return <span>Can be collateral</span>
        },
        cell: (info) => {
          return (info.getValue() as boolean) ? (
            <div className=' flex max-w-[100px] items-center justify-center'>
              <Image src={icCheck} alt='check' />
            </div>
          ) : (
            ''
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
            <BtnSupply
              onClick={() => {
                const data = info.row.original
                handleOpenModal({
                  data: data,
                  type: 'supply',
                })
              }}
            />
          )
        },
        footer: (props) => props.column.id,
      },
    ],
    [handleOpenModal]
  )

  return { columns, modalProps }
}

export default useColumnsAssetSupply
