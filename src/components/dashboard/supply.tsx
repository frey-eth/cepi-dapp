'use client'
import non_token from '@/icons/nonToken.svg'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/global-pool/usdc.svg'
import bgAssets from '@/images/portfolio/assets-supply.png'
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
        header: () => <span className=' gap-2 text-left '>Asset</span>,
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
        header: () => <p className='text-center'>Balance</p>,
        cell: (info) => {
          const balanceAmount = info.row.original.balance.amount
          const balanceValue = info.row.original.balance.value

          return (
            <figure className='flex items-center justify-start'>
              <div className='flex flex-row items-center gap-[6px]'>
                <div className='text-start'>{balanceAmount}</div>
                {balanceValue && (
                  <div className='text-start text-sm font-normal leading-[14px] text-[#8F9399]'>
                    {'('}${balanceValue}
                    {')'}
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
        header: () => <p>APY</p>,
        cell: (info) => {
          return info.getValue() ? (
            <Dental percent={Number(info.getValue())} />
          ) : (
            <p className={`text-left text-[#00E585]`}>--</p>
          )
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
        name: 'SOL',
      },
      balance: {
        amount: '0.0010000',
        value: 3.31,
      },
      apy: 2.16,
    },
    {
      asset: {
        icon: ic_bonk,
        name: 'BONK',
      },
      balance: {
        amount: '0.0010000',
        value: 3.31,
      },
      apy: 2.16,
    },
    {
      asset: {
        icon: ic_usdc,
        name: 'USDC',
      },
      balance: {
        amount: '0.0010000',
        value: 3.31,
      },
      apy: 2.16,
    },
  ]

  // if data = [] use this!!!!!
  const nonData: ISupply[] = [
    {
      asset: {
        icon: non_token,
        name: '--',
      },
      balance: {
        amount: '--',
      },
      apy: undefined,
    },
  ]

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <div
      className={`relative ${type === 'supply' ? 'h-[340px] max-h-[318px]' : 'h-[220px] md:h-[340px]'} flex  w-full flex-col  gap-4 overflow-y-auto rounded-lg  border border-solid border-[#43434352] bg-[rgba(11,13,16,0.8)] p-4 md:border-[#252B3D26]`}
    >
      <Image src={bgAssets} alt='background' fill />
      <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden font-helveticaNeue'>
        <div className='text-xl font-medium leading-5 text-white'>
          {type == 'supply' ? 'Your Supplies' : 'Your Borrows'}
        </div>
        {type == 'supply' ? (
          <div className='flex h-[26px] w-full flex-row items-center leading-[14px] max-sm:justify-between min-[375px]:gap-[6px] min-[414px]:gap-2 md:gap-2'>
            <p className='flex h-[26px] flex-row items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[111px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
              <span className=' font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
                Balance
              </span>
              <span className=' font-medium leading-4 text-white min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
                $3.31
              </span>
            </p>
            <p className='flex h-[26px] flex-row items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[111px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
              <span className=' font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
                APY
              </span>
              <span className=' font-medium leading-4 text-white min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
                2.16%
              </span>
            </p>
            <p className='flex h-[26px] flex-row items-center justify-center rounded border border-[#3C3937] px-2 pb-[1px] max-sm:w-[111px] min-[375px]:gap-x-[6px] min-[414px]:gap-x-[10px]  md:gap-x-[10px]'>
              <span className='font-normal leading-4 text-[#8F9399] max-sm:text-[12px] min-[375px]:text-[12px] min-[414px]:text-[12px] md:text-[14px]'>
                Collateral
              </span>
              <span className='  font-medium leading-4 text-white min-[375px]:text-[12px] min-[414px]:text-[14px] md:text-[14px]'>
                $3.31
              </span>
            </p>
          </div>
        ) : (
          <div className='text-sm font-normal text-[#C6C6C6]'>Nothing borrowed yet</div>
        )}
        <div className='table-custom h-[270px] w-full md:overflow-y-auto'>
          <Table
            className='w-full'
            columns={columns}
            data={type == 'supply' ? data : nonData}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>
      </div>
    </div>
  )
}

export default Supply
