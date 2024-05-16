'use client'
import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnDetail from '@/components/common/button/btn-detail'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import { dataBorrow } from '@/data/asset-borrow/asset-borrow'
import tooltipData from '@/data/tooltip/tooltip-asset-borrow.json'
import bgAssets from '@/images/portfolio/assets-supply.png'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AssetsBorrow } from '../../../types/table'
import useModal from '../../hooks/useModal'
import { Modal } from '../common/modal'
import CustomTooltip from '../common/tooltip'

const AssetsToBorrow = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()

  const columns = useMemo<ColumnDef<AssetsBorrow>[]>(
    () => [
      {
        id: 'assets',
        accessorKey: 'assets',
        header: () => <span className=' gap-2 text-left'>Asset</span>,
        cell: (info) => {
          const { icon, name } = info.row.original.asset
          return (
            <div className='flex items-center justify-start space-x-3 '>
              <figure>
                <Image src={icon} alt='icon' className='pt-[1px]' />
              </figure>
              <span className='mt-[1px] hidden font-helveticaNeue text-[14px] font-normal md:mt-[1px] md:block '>
                {name}
              </span>
              <div className=' flex flex-col items-start justify-start  text-left lg:hidden'>
                <div className='flex h-[20px] items-center pt-[2px] text-left text-[14px] leading-[14px]'>{name}</div>
                <div className='pt-[1px] md:hidden'>
                  <Dental percent={Number(info.row.original.apy)} />
                </div>
              </div>
            </div>
          )
        },
        sortingFn: (rowA, rowB) => rowB.original.asset.name.localeCompare(rowA.original.asset.name),
        footer: (props) => props.column.id,
      },
      {
        id: 'available',
        accessorKey: 'available',
        header: () => {
          return (
            <figure className='flex items-center justify-start space-x-2 pl-4'>
              <span>Available</span>

              <div>
                <Image src={ic_alert} alt='icon alert' sizes='16' id='available' />
              </div>
            </figure>
          )
        },
        enableSorting: false,
        cell: (info) => {
          return (
            <figure className='flex w-[70px] items-center justify-start space-x-2 pl-4'>
              <div className='flex flex-col items-start justify-start text-left md:flex-row md:items-center md:gap-1'>
                <span className='block text-left'>{Number(info.getValue())}</span>

                <div className='flex text-[#8F9399]'>
                  <div className='hidden md:block'>{'('}</div>
                  <div>${Number(info.getValue())}</div>
                  <div className='hidden md:block'>{')'}</div>
                </div>
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
          return (
            <figure className='hidden items-center justify-end space-x-2 md:flex'>
              <span>APY, variable</span>
              <Image src={ic_alert} alt='icon alert' sizes='16' id='apy' />
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

  const [sorting, setSorting] = useState<SortingState>([])

  return (
    <>
      <div className='relative h-fit max-h-[340px] w-full rounded-lg border border-solid border-[#43434352] font-helveticaNeue  md:border-none  lg:h-[300px] '>
        <Image src={bgAssets} alt='background' fill priority />
        <div className='relative   py-4 pl-4 md:mx-auto  md:px-4 md:py-2'>
          <div className='flex h-[50px] flex-col justify-between lg:flex-row lg:items-center'>
            <h2 className='text-xl font-medium text-[#fff]'>Assets to Borrow</h2>
          </div>

          <div className='table-custom h-[230px] w-full overflow-y-auto lg:h-[240px]'>
            <Table
              className='w-[350px] md:w-full'
              columns={columns}
              data={dataBorrow}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </div>
      </div>
      <Modal {...modalProps} />
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </>
  )
}

export default AssetsToBorrow
