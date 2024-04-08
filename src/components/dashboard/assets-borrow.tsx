'use client'
import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnDetail from '@/components/common/button/btn-detail'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import ic_dai from '@/images/portfolio/dai.svg'
import ic_usdc from '@/images/portfolio/sol.svg'
import ic_usdt from '@/images/portfolio/usdt.svg'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { AssetsBorrow } from '../../../types/table'

const AssetsToBorrow = () => {
  const columns = useMemo<ColumnDef<AssetsBorrow>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <p className=' text-left'>Assets</p>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3 '>
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
        id: 'available',
        accessorKey: 'available',
        header: () => {
          return (
            <figure className='flex items-center justify-end space-x-2'>
              <span>Available</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <figure className='flex flex-col items-end justify-end space-x-2 text-right'>
              <span>{Number(info.getValue()).toLocaleString()}</span>
              <span className='text-[#8F9399]'>${Number(info.getValue()).toLocaleString()}</span>
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
            <figure className='flex items-center justify-end space-x-2'>
              <span>APY, variable</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <div className='items-end justify-end space-x-2 text-right'>
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
        cell: () => {
          return (
            <div className=' flex items-center justify-end gap-2'>
              <BtnBorrow />
              <BtnDetail />
            </div>
          )
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  )
  const data: AssetsBorrow[] = [
    {
      asset: {
        icon: ic_usdt,
        name: 'USDT',
      },
      available: 2.71,
      apy: 7.03,
    },
    {
      asset: {
        icon: ic_dai,
        name: 'DAI',
      },
      available: 2.71,
      apy: 34.98,
    },
    {
      asset: {
        icon: ic_usdc,
        name: 'USDC',
      },
      available: 2.71,
      apy: 22.64,
    },
  ]
  return (
    <div className='w-full'>
      <div className=' mx-auto flex  flex-col gap-4 rounded-[8px] border border-solid border-[#00000052] bg-[#0B0D10CC] p-4 '>
        <div className='text-[20px] font-medium leading-[20px] text-[#FFFFFF]'>Assets to borrow</div>
        <div className='w-full'>
          <Table columns={columns} data={data} className='  w-full   ' />
        </div>
      </div>
    </div>
  )
}

export default AssetsToBorrow
