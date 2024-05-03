'use client'
import BtnSupply from '@/components/common/button/btn-supply'
import Filter from '@/components/common/filter'
import { Modal } from '@/components/common/modal'
import useModal from '@/components/common/modal/hook/useModal'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/portfolio/usdc.svg'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'

import { GlobalPool } from '../../../types/table'
import { kFormatter } from '../../../utils/libs/fortmat'
const Loans = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<GlobalPool>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <p className='text-left'>Asset</p>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3'>
              <figure>
                <Image src={icon} alt='icon' />
              </figure>
              <span className='hidden lg:block'>{name}</span>
              <div className='flex flex-col items-center justify-start font-normal lg:hidden'>
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
        id: 'price',
        accessorKey: 'price',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Price</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <figure className='flex items-center justify-start space-x-2'>
              <span>${Number(info.getValue()).toLocaleString()}</span>
              {/* <Image src={ic_finger} alt='finger' /> */}
            </figure>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'apy',
        accessorKey: 'apy',
        header: () => {
          return (
            <figure className='hidden items-center justify-center space-x-2 md:flex'>
              <span>APY</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <div className='hidden md:block'>
              <Dental percent={Number(info.getValue())} />
            </div>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'weight',
        accessorKey: 'weight',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Weight</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => <span className='flex items-center justify-start space-x-2'>{info.getValue() as string}%</span>,
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'deposit',
        accessorKey: 'deposit',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Deposits</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2'>{kFormatter(Number(info.getValue()))}</span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'globalLimit',
        accessorKey: 'globalLimit',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Global limit</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2'>{kFormatter(Number(info.getValue()))}</span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'utilization',
        accessorKey: 'utilization',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Utilization</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => <span className='flex items-center justify-start space-x-2'>{info.getValue() as string}%</span>,
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'walletAmt',
        accessorKey: 'walletAmt',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Wallet Amt</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2'>${Number(info.getValue()).toLocaleString()}</span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'btn',
        accessorKey: '',
        header: '',
        cell: (info) => {
          return (
            <div className=' '>
              <BtnSupply
                onClick={() => {
                  const data = info.row.original
                  handleOpenModal({
                    data: data,
                    type: 'supply',
                  })
                }}
              />
            </div>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      },
    ],
    [handleOpenModal]
  )
  const data: GlobalPool[] = [
    {
      asset: {
        icon: ic_solana,
        name: 'Solana',
      },
      price: 1000,
      apy: 70,
      weight: 100,
      deposit: 150000,
      globalLimit: 10,
      utilization: 0,
      walletAmt: 100,
    },
    {
      asset: {
        icon: ic_bonk,
        name: 'Bonk',
      },
      price: 1000,
      apy: 70,
      weight: 100,
      deposit: 100,
      globalLimit: 10,
      utilization: 0,
      walletAmt: 100,
    },
    {
      asset: {
        icon: ic_usdc,
        name: 'USDC',
      },
      price: 1000,
      apy: 70,
      weight: 100,
      deposit: 100,
      globalLimit: 10,
      utilization: 0,
      walletAmt: 100,
    },
  ]

  return (
    <main className='mx-auto h-full w-full p-4 pt-10 lg:w-[1288px]'>
      <div className='h-full w-full lg:min-h-[728px]'>
        <section className='table-custom relative h-[450px] overflow-y-auto rounded-2xl bg-[rgba(255,255,255,0.06)] p-4 backdrop-blur-[75px] md:h-[398px] md:overflow-hidden md:p-6'>
          {/* <Image src={bgGlobalPool} alt='bg' fill priority /> */}
          <div className='relative flex flex-col gap-4 md:gap-0'>
            <Filter />
            <div>
              <span className='block text-2xl font-medium text-[#FFF] md:my-4'>Global Pool</span>
              <div className='table-custom h-[236px] w-full overflow-y-auto'>
                <Table
                  hasResponsive
                  columns={columns}
                  data={data}
                  className=' custom-table relative w-[1000px] lg:w-full'
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal {...modalProps} />
    </main>
  )
}

export default Loans
