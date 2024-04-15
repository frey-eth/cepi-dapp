'use client'
import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnDetail from '@/components/common/button/btn-detail'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import bgAssets from '@/images/portfolio/assets-supply.png'
import ic_dai from '@/images/portfolio/dai.svg'
import ic_usdc from '@/images/portfolio/sol.svg'
import ic_usdt from '@/images/portfolio/usdt.svg'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { AssetsBorrow } from '../../../types/table'
import { Modal } from '../common/modal'
import useModal from '../common/modal/hook/useModal'

const AssetsToBorrow = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<AssetsBorrow>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <p className=' w-[140px] text-left'>Assets</p>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex w-[140px] items-center justify-start space-x-3 '>
              <figure>
                <Image src={icon} alt='icon' />
              </figure>
              <span>{name}</span>
            </div>
          )
        },
        enableSorting: false,
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
        enableSorting: false,
        cell: (info) => {
          return (
            <figure className='flex min-w-[40px] flex-col items-end justify-center space-x-2 text-right lg:pr-3'>
              <p>
                <span className='block text-left'>{Number(info.getValue()).toLocaleString()}</span>
                <span className='text-[#8F9399]'>${Number(info.getValue()).toLocaleString()}</span>
              </p>
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
        enableSorting: false,
        cell: (info) => {
          return (
            <div className='flex justify-end lg:pr-3'>
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
        name: 'Bonk',
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
    {
      asset: {
        icon: ic_dai,
        name: 'Bonk',
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
    <>
      <div className='relative h-[340px] w-full'>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative flex h-full flex-col rounded-[8px] border border-solid border-[#00000052] bg-[#0B0D10CC] py-4 pl-4 md:mx-auto md:p-4 '>
          <div className='flex h-[50px] items-center text-[20px] font-medium leading-[20px] text-[#FFFFFF]'>
            Assets to borrow
          </div>
          <div className='table-custom h-[230px] w-full overflow-y-auto'>
            <Table className='w-[576px] md:w-full' columns={columns} data={data} />
          </div>
        </div>
      </div>
      <Modal {...modalProps} />
    </>
  )
}

export default AssetsToBorrow
