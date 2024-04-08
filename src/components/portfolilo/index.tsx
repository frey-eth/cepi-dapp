'use client'
import bgGlobalPool from '@/images/global-pool/Noise.png'
import ic_solana from '@/images/global-pool/sol.svg'
import bgAssets from '@/images/portfolio/assets-supply.png'
import icCheck from '@/images/portfolio/check.svg'
import ic_denta from '@/images/portfolio/denta.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AssetSupply } from '../../../types/table'
import Checkbox from '../checkbox'
import BtnSupply from '../common/button/btn-supply'
import Table from '../common/table'
import Dental from '../common/table/dental'
const Portfolio = () => {
  const [checked, setChecked] = useState(false)
  const columns = useMemo<ColumnDef<AssetSupply>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <p className='pl-6 text-left'>Assets</p>,
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
        id: 'walletBalance',
        accessorKey: 'walletBalance',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Wallet balance</span>
              <Image src={ic_denta} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        id: 'apy',
        accessorKey: 'apy',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>APY</span>
              <Image src={ic_denta} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => <Dental percent={Number(info.getValue())} />,
        footer: (props) => props.column.id,
      },
      {
        id: 'isCollateral',
        accessorKey: 'isCollateral',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Can be collateral</span>
              <Image src={ic_denta} alt='icon alert' sizes='16' />
            </figure>
          )
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
        cell: () => {
          return <BtnSupply />
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  )

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
      walletBalance: 0.0087386,
      apy: -2.16,
      isCollateral: false,
    },
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
      walletBalance: 0.0087386,
      apy: -2.16,
      isCollateral: false,
    },
  ]

  return (
    <main className='relative mx-auto h-[640px] w-[1288px] rounded-lg  p-6'>
      <Image src={bgGlobalPool} alt='bg' fill priority />
      <section>
        <h2 className='text-2xl font-medium text-[#fff]'>Portfolio</h2>
        <div className='relative h-[300px] w-[608px]'>
          <Image src={bgAssets} alt='background' fill priority />
          <div className='relative p-4'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to supply</h2>
            <div className='my-4 flex items-center space-x-3'>
              <Checkbox checked={checked} setChecked={setChecked} />
              <span className='text-sm font-normal text-[#8F9399]'>Show assets with 0 balance</span>
            </div>
            <div className='table-custom h-[170px] w-full overflow-y-auto'>
              <Table className='w-full overflow-y-auto' columns={columns} data={data} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Portfolio
