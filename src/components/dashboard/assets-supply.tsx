'use client'
import ic_solana from '@/images/global-pool/sol.svg'
import bgAssets from '@/images/portfolio/assets-supply.png'
import icCheck from '@/images/portfolio/check.svg'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AssetSupply } from '../../../types/table'
import Checkbox from '../checkbox'
import BtnSupply from '../common/button/btn-supply'
import Table from '../common/table'
import Dental from '../common/table/dental'
const AssetsSupply = () => {
  const [checked, setChecked] = useState(false)
  const columns = useMemo<ColumnDef<AssetSupply>[]>(
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
        id: 'walletBalance',
        accessorKey: 'walletBalance',
        header: () => {
          return <span>Wallet balance</span>
        },
        cell: (info) => info.getValue(),
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
        enableSorting: false,
        header: () => {
          return <span>Can be collateral</span>
        },
        cell: (info) => {
          return (info.getValue() as boolean) ? <Image src={icCheck} className='mx-auto' alt='check' /> : ''
        },
        footer: (props) => props.column.id,
      },
      {
        id: 'btn',
        accessorKey: '',
        header: '',
        enableSorting: false,
        cell: () => {
          return <BtnSupply />
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const data: AssetSupply[] = [
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      walletBalance: 0.0087386,
      apy: 2.16,
      isCollateral: true,
    },
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      walletBalance: 0.0087385,
      apy: -2.16,
      isCollateral: false,
    },
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      walletBalance: 0.0087384,
      apy: 2.15,
      isCollateral: true,
    },
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      walletBalance: 0.0087383,
      apy: -2.15,
      isCollateral: false,
    },
  ]

  return (
    <div className='relative h-[300px] w-full'>
      <Image src={bgAssets} alt='background' fill priority />
      <div className='relative p-4'>
        <h2 className='text-xl font-medium text-[#fff]'>Assets to supply</h2>
        <div className='my-4 flex items-center space-x-3'>
          <Checkbox checked={checked} setChecked={setChecked} />
          <span className='text-sm font-normal text-[#8F9399]'>Show assets with 0 balance</span>
        </div>
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
    </div>
  )
}

export default AssetsSupply
