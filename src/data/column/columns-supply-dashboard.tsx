import Dental from '@/components/common/table/dental'
import { ColumnDef } from '@tanstack/react-table'

import BtnWithdraw from '@/components/common/button/btn-withdraw'
import { ISupply, Type } from '@/types/table'
import Image from 'next/image'

export const getDataColumnsWithdraw = ({
  onClickWithdraw,
}: {
  onClickWithdraw: ({ data, type }: { data: ISupply; type: Type }) => void
}): ColumnDef<ISupply>[] => [
  {
    id: 'assets',
    accessorKey: 'assets',
    header: () => <span className=' gap-2 text-left font-medium leading-[14px] '>Asset</span>,
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
    id: 'balance',
    accessorKey: 'balance',
    header: () => <p className='text-center font-medium leading-[14px]'>Balance</p>,
    cell: (info) => {
      const balanceAmount = info.row.original.balance.amount
      const balanceValue = info.row.original.balance.value
      return (
        <figure className='flex items-center justify-start'>
          <div className='flex flex-col items-start justify-center gap-1 text-start text-sm font-normal leading-[14px] md:flex-row md:items-center md:justify-start md:gap-2'>
            <p>{balanceAmount}</p>
            {balanceValue && (
              <div className='flex text-[#8F9399]'>
                <div className='hidden md:flex'>{'('}</div>
                <div className='text-[#8F9399]'>{`$${balanceValue}`}</div>
                <div className='hidden md:flex'>{')'}</div>
              </div>
            )}
          </div>
        </figure>
      )
    },
    sortingFn: (rowA, rowB) => Number(rowA.original.balance.value) - Number(rowB.original.balance.value),
    footer: (props) => props.column.id,
  },
  {
    id: 'apy',
    accessorKey: 'apy',
    header: () => <p className='font-medium leading-[14px]'>APY</p>,
    cell: (info) => {
      return info.getValue() ? (
        <Dental percent={Number(info.getValue())} />
      ) : (
        <p className={`text-left text-[#00E585]`}>--</p>
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
        <div style={{ justifyContent: 'end' }} className='flex items-center  '>
          <BtnWithdraw
            onClick={() => {
              const data = info.row.original
              onClickWithdraw({
                data: data,
                type: 'withdraw',
              })
            }}
          />
        </div>
      )
    },
    footer: (props) => props.column.id,
  },
]
