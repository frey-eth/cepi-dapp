'use client'
import ic_alert from '@/icons/alert-triangle-light.svg'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import ic_usdc from '@/images/global-pool/usdc.svg'
import bgAssets from '@/images/portfolio/assets-supply.png'
import icCheck from '@/images/portfolio/check.svg'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AssetSupply } from '../../../types/table'
import Checkbox from '../checkbox'
import BtnSupply from '../common/button/btn-supply'
import { Modal } from '../common/modal'
import useModal from '../common/modal/hook/useModal'
import Table from '../common/table'
import Dental from '../common/table/dental'
const AssetsSupply = () => {
  const [checked, setChecked] = useState(false)

  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<AssetSupply>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <span className='mx-2 gap-2 text-left'>Assets</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3'>
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
        id: 'walletBalance',
        accessorKey: 'walletBalance',
        header: () => {
          return <span>Wallet balance</span>
        },
        cell: (info) => {
          const { isError } = info.row.original
          return (
            <figure className=''>
              <p className='flex w-[70px] items-center justify-start space-x-2'>
                <span className='block text-left'>${Number(info.getValue()).toLocaleString()}</span>
                {isError && <Image src={ic_alert} alt='alert' />}
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
          return <span>APY</span>
        },
        cell: (info) => <Dental percent={Number(info.getValue())} />,
        footer: (props) => props.column.id,
      },
      {
        id: 'isCollateral',
        accessorKey: 'isCollateral',
        // enableSorting: false,
        header: () => {
          return <span>Can be collateral</span>
        },
        cell: (info) => {
          return (info.getValue() as boolean) ? (
            <div className='flex max-w-[100px] items-center justify-center'>
              <Image src={icCheck} className='mx-auto  ' alt='check' />
            </div>
          ) : (
            ''
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
        footer: (props) => props.column.id,
      },
    ],
    [handleOpenModal]
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const data: AssetSupply[] = [
    {
      asset: {
        icon: ic_solana,
        name: 'SOL',
      },
      walletBalance: 0.0087386,
      apy: 2.16,
      isCollateral: true,
      isError: true,
    },
    {
      asset: {
        icon: ic_bonk,
        name: 'BONK',
      },
      walletBalance: 0.0087385,
      apy: -2.16,
      isCollateral: false,
    },
    {
      asset: {
        icon: ic_usdc,
        name: 'USDC',
      },
      walletBalance: 0.0087384,
      apy: 2.15,
      isCollateral: true,
    },
  ]

  return (
    <>
      <div className='relative h-[340px] w-full'>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative py-4 pl-4 md:p-4'>
          <div className='flex flex-col justify-between lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to supply</h2>
            <div className='my-4 flex items-center space-x-3'>
              <Checkbox checked={checked} setChecked={setChecked} />
              <span className='text-sm font-normal text-[#8F9399]'>Show assets with 0 balance</span>
            </div>
          </div>

          <div className='table-custom h-[230px] w-full overflow-y-auto'>
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
      <Modal {...modalProps} />
    </>
  )
}

export default AssetsSupply
