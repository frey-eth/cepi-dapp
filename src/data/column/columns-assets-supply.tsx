import Dental from '@/components/common/table/dental'
// import icAlert from '@/icons/alert-triangle-light.svg'

import icCheck from '@/images/portfolio/check.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import BtnDetail from '@/components/common/button/btn-detail'
import BtnMain from '@/components/common/button/btn-main'
import { AssetSupply, Type } from '@/types/table'

export const getDataColumnsAssetSupply = ({
  onClickSupply,
  onClickDetails,
}: {
  onClickSupply: ({ data, type }: { data: AssetSupply; type: Type }) => void
  onClickDetails: ({ data }: { data: AssetSupply }) => void
}): ColumnDef<AssetSupply>[] => [
  {
    id: 'assets',
    accessorKey: 'assets',
    header: () => <span className=' gap-2 text-left font-medium leading-[14px]'>Asset</span>,
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
      return <span className='font-medium leading-[14px]'>Wallet balance</span>
    },
    cell: (info) => {
      return (
        <figure>
          <div className='flex w-[70px] items-center justify-start gap-2 space-x-2'>
            <span className='block text-left'>{Number(info.getValue())}</span>
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
      return <span className='font-medium leading-[14px]'>APY</span>
    },
    cell: (info) => <Dental percent={Number(info.getValue())} />,
    footer: (props) => props.column.id,
  },
  {
    id: 'isCollateral',
    accessorKey: 'isCollateral',

    header: () => {
      return <span className='font-medium leading-[14px]'>Can be collateral</span>
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
        <div style={{ justifyContent: 'end' }} className=' flex items-center justify-end gap-2 '>
          <BtnMain
            title='Supply'
            onClick={() => {
              const data = info.row.original
              onClickSupply({
                data: data,
                type: 'supply',
              })
            }}
          />
          <BtnDetail
            onClick={() => {
              const data = info.row.original
              onClickDetails({
                data: data,
              })
            }}
          />
        </div>
      )
    },
    footer: (props) => props.column.id,
  },
]
