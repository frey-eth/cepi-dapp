'use client'
import ic_solana from '@/images/global-pool/sol.svg'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ISupply } from '../../../types/table'
import Dental from '../common/table/dental'
import Table from '../common/table/index'
const Supply = ({ type }: { type: string }) => {
  const columns = useMemo<ColumnDef<ISupply>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <span className='mx-2 gap-2 pl-6 text-left'>Assets</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3 pl-6'>
              <figure>
                <Image src={icon} alt='icon' />
              </figure>
              <span>{name}</span>
            </div>
          )
        },
        sortingFn: (rowA, rowB) => rowB.original.asset.name.localeCompare(rowA.original.asset.name),
        footer: (props) => props.column.id,
      },
      {
        id: 'balance',
        accessorKey: 'balance',
        header: () => <p className='text-center'>Balance</p>,
        cell: (info) => {
          const balanceAmount = info.row.original.balance.amount
          const balanceValue = info.row.original.balance.value

          return (
            <figure className='flex items-center justify-start'>
              <div className='flex flex-col gap-[6px]'>
                <div className='text-start'>{balanceAmount.toLocaleString()}</div>
                <div className='text-start text-sm font-normal leading-[14px] text-[#8F9399]'>
                  ${balanceValue?.toLocaleString()}
                </div>
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
        header: () => <p>APY</p>,
        cell: (info) => {
          return <Dental percent={Number(info.getValue())} />
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  )

  const data: ISupply[] = [
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      balance: {
        amount: '0.0010000',
        value: 3.31,
      },
      apy: 2.16,
    },
    {
      asset: {
        icon: ic_solana,
        name: 'ETH',
      },
      balance: {
        amount: '0.0010000',
        value: 3.3,
      },
      apy: 2.15,
    },
  ]

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <div className='flex h-[216px] w-full flex-col gap-4 overflow-y-auto rounded-lg border border-[#252B3D26] bg-[rgba(11,13,16,0.8)] p-4'>
      <div className=' text-xl font-medium leading-5 text-white'>
        {type == 'supply' ? 'Your supplies' : 'Your Borrows'}
      </div>
      {type == 'supply' ? (
        <div className='flex h-[26px] flex-row gap-2'>
          <div className='flex h-full flex-row items-center justify-between gap-[10px] rounded border px-2 py-[6px] text-sm font-normal leading-[14px] text-[#8F9399]'>
            Balance <div className='text-sm font-medium text-white'>$3.31</div>
          </div>
          <div className='flex h-full flex-row items-center justify-between gap-[10px] rounded border px-2 py-[6px] text-sm font-normal leading-[14px] text-[#8F9399]'>
            APY <div className='text-sm font-medium text-white'>2.16%</div>
          </div>
          <div className='flex h-full flex-row items-center justify-between gap-[10px] rounded border px-2 py-[6px] text-sm font-normal leading-[14px] text-[#8F9399]'>
            Collateral <div className='text-sm font-medium text-white'>$3.31</div>
          </div>
        </div>
      ) : (
        <div className='text-sm font-normal text-[#C6C6C6]'>Nothing borrowed yet</div>
      )}
      <div className='table-custom h-[170px] w-full overflow-y-auto'>
        <Table
          className='w-[576px] md:w-full'
          columns={columns}
          data={data}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    </div>
  )
}

export default Supply
