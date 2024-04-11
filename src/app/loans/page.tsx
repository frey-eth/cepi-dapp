'use client'
import BtnSupply from '@/components/common/button/btn-supply'
import Filter from '@/components/common/filter'
import { Modal } from '@/components/common/modal'
import useModal from '@/components/common/modal/hook/useModal'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import arrowRight from '@/images/global-pool/arrowright.svg'
import backpack from '@/images/global-pool/backPack.png'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_finger from '@/images/global-pool/finger.png'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/global-pool/usdc.svg'
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
            <figure className='flex items-center justify-center space-x-2'>
              <span>${Number(info.getValue()).toLocaleString()}</span>
              <Image src={ic_finger} alt='finger' />
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
            <figure className='flex items-center justify-center space-x-2'>
              <span>APY</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' />
            </figure>
          )
        },
        cell: (info) => {
          return <Dental percent={Number(info.getValue())} />
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
        cell: (info) => <span>{info.getValue() as string}%</span>,
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
        cell: (info) => <span>{kFormatter(Number(info.getValue()))}</span>,
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
        cell: (info) => <span>{kFormatter(Number(info.getValue()))}</span>,
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
        cell: (info) => <span>{info.getValue() as string}%</span>,
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
        cell: (info) => <span>${Number(info.getValue()).toLocaleString()}</span>,
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'btn',
        accessorKey: '',
        header: '',
        cell: (info) => {
          return (
            <BtnSupply
              onClick={() => {
                const data = info.row.original
                handleOpenModal({
                  data: data,
                  type: 'supply',
                })
              }}
            />
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
      <div className='mb-8 w-full'>
        <div className='relative mx-auto w-full max-w-[462px] overflow-hidden rounded-lg p-[1px] transition-all duration-300 '>
          <div className='  pointer-events-none absolute left-[-20%] top-[20%] z-[1] h-[60%] w-[140%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(transparent,_270deg,_white,_transparent)]'></div>

          <div className='relative z-[5]'>
            <button className='flex w-full items-center gap-2 rounded-lg bg-[#111112] p-4'>
              <Image src={backpack} alt='icon alert' width={24} height={24} className='object-cover' />
              <span className='flex-1 text-start text-sm font-medium leading-[24px] text-white'>
                5% points boost for Backpack users!
              </span>
              <Image src={arrowRight} alt='icon alert' width={24} height={24} className='object-cover' />
            </button>
          </div>
        </div>
      </div>

      <section className='relative h-[398px] overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.06)] p-4 backdrop-blur-[75px] md:p-6'>
        {/* <Image src={bgGlobalPool} alt='bg' fill priority /> */}
        <div className='relative flex flex-col gap-16 md:gap-0'>
          <Filter />
          <div>
            <span className='my-4 block text-2xl font-medium text-[#FFF]'>Global Pool</span>
            <div className='table-custom h-[230px] w-full overflow-y-auto'>
              <Table columns={columns} data={data} className='w-[1000px] lg:w-full' />
            </div>
          </div>
        </div>
      </section>
      <Modal {...modalProps} />
    </main>
  )
}

export default Loans
