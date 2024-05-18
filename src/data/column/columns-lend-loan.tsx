import BtnSupply from '@/components/common/button/btn-supply'
import Dental from '@/components/common/table/dental'
import useModal from '@/hooks/useModal'
import icAlert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'

import Image from 'next/image'
import { useMemo } from 'react'
import { GlobalPool } from '../../../types/table'
import { kFormatter } from '../../../utils/libs/format'

const useColumnsLend = () => {
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
                <Image src={icon} alt='icon' width={24} height={24} className='mb-[1px]' />
              </figure>
              <span className='mt-[3px] hidden font-helveticaNeue text-[14px] font-normal leading-[14px] md:-mt-[1px] md:flex'>
                {name}
              </span>
              <div className='flex flex-col font-normal md:hidden'>
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
            <figure className='flex items-center justify-center gap-2'>
              <div>Price</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='lend_price' />
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
            <figure className='hidden items-center justify-center gap-2 md:flex'>
              <div>APY</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='apy' />
            </figure>
          )
        },
        cell: (info) => {
          return (
            <div className='hidden leading-[14px] md:flex'>
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
            <figure className='flex items-center justify-center gap-2'>
              <div>Weight</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='weight' />
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
            <figure className='flex items-center justify-center gap-2'>
              <div>Deposits</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='deposit' />
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
            <figure className='flex items-center justify-center gap-2'>
              <div>Global limit</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='globalLimit' />
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
            <figure className='flex items-center justify-center gap-2'>
              <div>Utilization</div>
              <Image src={icAlert} alt='icon alert' sizes='16' className='mb-[1px]' id='utilization' />
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

  return { columns, modalProps }
}

export default useColumnsLend
