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
        header: () => <p className='w-[100px] text-left md:w-[140px] '>Assets</p>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          // const apy = info.row.original.apy
          return (
            <div className='flex w-[100px] items-center justify-start space-x-3 md:w-[140px] '>
              <figure>
                <Image src={icon} alt='icon' />
              </figure>
              <div className='flex flex-col items-start justify-start font-normal'>
                <div>{name}</div>
                <div className='md:hidden'>
                  <Dental percent={Number(info.row.original.apy)} />
                </div>
              </div>
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
            <figure className='flex items-center justify-start space-x-2'>
              <span>Available</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        enableSorting: false,
        cell: (info) => {
          return (
            <figure className='flex w-[70px] items-center justify-start space-x-2'>
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
            <figure className='hidden items-center justify-end space-x-2 md:flex'>
              <span>APY, variable</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        enableSorting: false,
        cell: (info) => {
          return (
            <div className='hidden w-[70px] items-center justify-start space-x-2 md:flex'>
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
        name: 'SOL',
      },
      available: 2.71,
      apy: 7.03,
    },
    {
      asset: {
        icon: ic_dai,
        name: 'BONK',
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
      <div className='relative h-[340px] w-[382px] font-helveticaNeue  md:w-full'>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative flex h-full flex-col rounded-[8px] border border-solid border-[#00000052] bg-[#0B0D10CC] py-4 pl-4 md:mx-auto md:p-4 '>
          <div className='flex h-[50px] items-center text-[20px] font-medium leading-[20px] text-[#FFFFFF]'>
            Assets to borrow
          </div>
          <div className='table-custom h-[230px] w-[350px] overflow-y-auto md:w-full'>
            <Table className='w-[350px] md:w-full' columns={columns} data={data} />
          </div>
        </div>
      </div>
      <Modal {...modalProps} />
    </>
  )
}

export default AssetsToBorrow
