'use client'
import BtnSupply from '@/components/common/button/btn-supply'
import Filter from '@/components/common/filter'
import { Modal } from '@/components/common/modal'
import useModal from '@/components/common/modal/hook/useModal'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import bgGlobalPool from '@/images/global-pool/Noise.png'
import ic_finger from '@/images/global-pool/finger.png'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { GlobalPool } from '../../../types/table'
import { kFormatter } from '../../../utils/libs/fortmat'
const Loans = () => {
  const {
    isOpen: openModal,
    data: modalData,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
    isLoading: isLoadingModal,
    isSuccess: isSuccessModal,
    handleSupply: handleSupplyModal,
  } = useModal()

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
                  ...data,
                })
              }}
            />
          )
        },
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
        icon: ic_solana,
        name: 'Solana',
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
        icon: ic_solana,
        name: 'Solana',
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
    <main className='mx-auto h-[calc(100vh-104px)] w-[1288px] pt-10'>
      <section className=' backdrop-blur-lg relative h-[398px] overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.06)] p-6'>
        <Image src={bgGlobalPool} alt='bg' fill priority />
        <div className='relative'>
          <Filter />
          <span className='my-4 block text-2xl font-medium text-[#FFF]'>Global Pool</span>
          <Table columns={columns} data={data} className='relative mx-auto w-[1240px]' />
        </div>
      </section>
      <Modal
        data={modalData}
        isOpen={openModal}
        handleClose={handleCloseModal}
        isLoading={isLoadingModal}
        isSuccess={isSuccessModal}
        handleSupply={handleSupplyModal}
      />
    </main>
  )
}

export default Loans
