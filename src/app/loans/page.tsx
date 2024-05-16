'use client'
import BtnSupply from '@/components/common/button/btn-supply'
import Filter from '@/components/common/filter'
import { Modal } from '@/components/common/modal'
import useModal from '@/components/common/modal/hook/useModal'
import Table from '@/components/common/table'
import Dental from '@/components/common/table/dental'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import BtnBorrow from '@/components/common/button/btn-borrow'
import CustomTooltip from '@/components/common/tooltip'
import { data, dataBorrow } from '@/data/global-pool/global-pool-data'
import tooltipBorrowData from '@/data/tooltip/tooltip-borrow.json'
import tooltipData from '@/data/tooltip/tooltip.json'
import { GlobalPool, GlobalPoolBorrow } from '../../../types/table'
import { kFormatter } from '../../../utils/libs/format'
const Loans = () => {
  const { handleOpen: handleOpenModal, ...modalProps } = useModal()
  const [selectAction, setSelectAction] = useState('Lend')

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
                <Image src={icon} alt='icon' width={24} height={24} className='mb-[1px]' />
              </figure>
              <span className='mt-[3px] hidden font-helveticaNeue  text-[14px] font-normal leading-[14px] md:-mt-[1px] lg:block'>
                {name}
              </span>
              <div className='flex flex-col  font-normal lg:hidden'>
                <div className='text-left text-[14px] leading-[14px]'>{name}</div>
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
              <div>Price</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='lend_price' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <figure className='flex items-center justify-start space-x-2'>
              <span className='text-[14px] font-normal leading-[14px]'>${Number(info.getValue()).toFixed(2)}</span>
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
              <div>APY</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='apy' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <div className='hidden leading-[14px] md:block'>
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
              <div>Weight</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='weight' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 text-[14px] font-normal leading-[14px]'>
            {info.getValue() as string}%
          </span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'deposit',
        accessorKey: 'deposit',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <div>Deposits</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='deposit' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <span className='flex items-center justify-start space-x-2 text-[14px] font-normal leading-[14px]'>
              {kFormatter(Number(info.getValue()))}k
            </span>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      },

      {
        id: 'globalLimit',
        accessorKey: 'globalLimit',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <div>Global limit</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='globalLimit' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 text-[14px] leading-[14px]'>
            {kFormatter(Number(info.getValue()))}k
          </span>
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
              <div>Utilization</div>
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='utilization' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 leading-[14px]'>{info.getValue() as string}%</span>
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

  const columnsBorrow = useMemo<ColumnDef<GlobalPoolBorrow>[]>(
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
                <Image src={icon} alt='icon' width={24} height={24} className='mb-[1px]' />
              </figure>
              <span className='mt-[3px] hidden font-helveticaNeue  text-[14px] font-normal leading-[14px] md:mt-[-1px] lg:block'>
                {name}
              </span>
              <div className='flex flex-col  font-normal lg:hidden'>
                <div className='text-left leading-[14px]'>{name}</div>
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
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='price' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <figure className='flex items-center justify-start space-x-2'>
              <span className='leading-[14px]'>${Number(info.getValue()).toFixed(2)}</span>
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
              <Image src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' id='apy_borrow' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <div className='hidden leading-[14px] md:block'>
              <Dental percent={Number(info.getValue())} />
            </div>
          )
        },
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'ltv',
        accessorKey: 'ltv',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>LTV</span>
              <Image id='ltv' src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 leading-[14px]'>{info.getValue() as string}%</span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'available',
        accessorKey: 'available',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Available</span>
              <Image id='available' src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 leading-[14px]'>
            {kFormatter(Number(info.getValue()))}k
          </span>
        ),
        enableSorting: false,
        footer: (props) => props.column.id,
      },
      {
        id: 'total_borrow',
        accessorKey: 'total_borrow',
        header: () => {
          return (
            <figure className='flex items-center justify-center space-x-2'>
              <span>Total Borrows</span>
            </figure>
          )
        },
        cell: (info) => {
          return (
            <span className='flex items-center justify-start space-x-2 leading-[14px]'>
              {kFormatter(Number(info.getValue()))}k
            </span>
          )
        },
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
              <Image id='utilization_borrow' src={ic_alert} alt='icon alert' sizes='16' className='mb-[1px]' />
            </figure>
          )
        },
        cell: (info) => (
          <span className='flex items-center justify-start space-x-2 leading-[14px]'>
            ${Number(info.getValue()).toFixed(2)}
          </span>
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
              <BtnBorrow
                onClick={() => {
                  const data = info.row.original
                  handleOpenModal({
                    data: data,
                    type: 'borrow',
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

  return (
    <main className='mx-auto h-full w-full  p-4 pt-10  lg:w-[1288px]'>
      <div className='h-full w-full   lg:min-h-[728px]'>
        <section className='table-custom relative overflow-y-hidden rounded-[16px] border border-solid border-[#43434352] bg-[rgba(255,255,255,0.06)] min-[315px]:h-[450px] min-[320px]:p-4 min-[375px]:h-[380px] min-[375px]:p-2 min-[414px]:h-[400px] min-[414px]:p-4 md:h-[398px] md:overflow-hidden  md:rounded-2xl md:border-none md:p-6'>
          <div className='backdrop absolute inset-0 rounded-2xl'></div>
          <div className='relative flex flex-col gap-4 md:gap-0'>
            <Filter selectAction={selectAction} setSelectAction={setSelectAction} />
            <div>
              <span className='block text-2xl font-medium text-[#FFF] md:my-4'>Global Pool</span>

              <div className='table-custom h-[236px] w-full overflow-y-auto'>
                {selectAction === 'Lend' ? (
                  <Table
                    hasResponsive
                    columns={columns}
                    data={data}
                    className=' custom-table relative w-[1000px] lg:w-full'
                  />
                ) : (
                  <Table
                    hasResponsive
                    columns={columnsBorrow}
                    data={dataBorrow}
                    className=' custom-table relative w-[1000px] lg:w-full'
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal {...modalProps} />
      {tooltipData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
      {tooltipBorrowData.map((item, key) => (
        <CustomTooltip id={item.id} key={key} content={item.content} />
      ))}
    </main>
  )
}

export default Loans
