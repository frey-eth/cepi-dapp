'use client'
import ic_alert from '@/icons/alert-triangle-light.svg'
import ic_bonk from '@/images/global-pool/bonk.svg'
import ic_solana from '@/images/global-pool/sol.svg'
import bgAssets from '@/images/portfolio/assets-supply.png'
import icCheck from '@/images/portfolio/check.svg'
import ic_usdc from '@/images/portfolio/usdc.svg'
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
        header: () => <span className=' gap-2 text-left'>Asset</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3'>
              <figure>
                <Image src={icon} alt='icon' className='mb-[1px]' />
              </figure>
              <div className='mt-[3px] h-fit font-helveticaNeue text-[14px] font-normal leading-[14px] md:mt-[1px]'>
                {name}
              </div>
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
        cell: (info) => {
          const { isError } = info.row.original
          return (
            <figure>
              <div className='flex w-[70px] items-center justify-start space-x-2'>
                <span className='block text-left'>{Number(info.getValue()).toLocaleString()}</span>
                {isError && <Image src={ic_alert} alt='alert' />}
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
            <div className=' flex max-w-[100px] items-center justify-center'>
              <Image src={icCheck} alt='check' />
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
      walletBalance: 216.38,
      apy: 2.16,
      isCollateral: true,
      isError: true,
    },
    {
      asset: {
        icon: ic_bonk,
        name: 'BONK',
      },
      walletBalance: 216.38,
      apy: -2.16,
      isCollateral: false,
    },
    {
      asset: {
        icon: ic_usdc,
        name: 'USDC',
      },
      walletBalance: 216.38,
      apy: 2.15,
      isCollateral: true,
    },
  ]

  return (
    <>
      <div className='relative h-[340px] w-full font-helveticaNeue lg:h-[300px]'>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative py-4 pl-4 md:mx-auto md:px-4 md:py-2'>
          <div className='flex flex-col justify-between md:h-[50px] lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Supply</h2>
            <div className='my-4 flex items-center space-x-3'>
              <Checkbox checked={checked} setChecked={setChecked} />
              <span className='text-sm font-normal text-[#8F9399]'>Show assets with 0 balance</span>
            </div>
          </div>

          <div className=' table-custom2 h-[230px] w-full overflow-y-auto lg:h-[240px]'>
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
