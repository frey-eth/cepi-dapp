'use client'
import Image from 'next/image'
import Table from './index'
import { ColumnDef } from '@tanstack/react-table'
import { ISupply } from '../../../../types/table'
import { useMemo } from 'react'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_upDown from '@/icons/up.svg'
import Dental from './dental'
const Supply = ({ type }: { type: string }) => {
  const columns = useMemo<ColumnDef<ISupply>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => (
          <div className='mx-2 flex flex-row items-center gap-2 pl-6 text-left'>
            Assets <Image src={ic_upDown} alt='icon sort' sizes='16' />
          </div>
        ),
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
        footer: (props) => props.column.id,
      },
      {
        id: 'balance',
        accessorKey: 'balance',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Balance</span>
              <Image src={ic_upDown} alt='icon sort' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          const balanceAmount = info.row.original.balance.amount
          const balanceValue = info.row.original.balance.value

          return (
            <figure className='flex items-center justify-center'>
              <div className='flex flex-col gap-[6px]'>
                <div className='text-start'>{balanceAmount.toLocaleString()}</div>
                <div className='text-start text-sm font-normal leading-[14px] text-[#8F9399]'>
                  ${balanceValue.toLocaleString()}
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
            <figure className='flex items-center justify-center space-x-2'>
              <span>APY</span>
              <Image src={ic_upDown} alt='icon sort' sizes='16' />
            </figure>
          )
        },
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
  ]

  return (
    <div className='flex w-[608px] flex-col gap-4 rounded-lg border border-[#252B3D26] bg-[rgba(11,13,16,0.8)] p-4'>
      <div className=' text-xl font-medium leading-5 text-white'>
        {type == 'supply' ? 'Your supplies' : 'Your Borrow'}
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
      <Table columns={columns} data={data} />
    </div>
  )
}

export default Supply
