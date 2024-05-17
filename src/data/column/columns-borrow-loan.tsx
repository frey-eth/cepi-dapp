import BtnBorrow from '@/components/common/button/btn-borrow'
import Dental from '@/components/common/table/dental'
import useModal from '@/hooks/useModal'
import ic_alert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { useMemo } from 'react'
import { GlobalPoolBorrow } from '../../../types/table'
import { kFormatter } from '../../../utils/libs/format'

const useColumnsBorrow = () => {
  const { handleOpen: handleOpenModal, ...modalPropsBorrowing } = useModal()

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
              <span className='mt-[3px] hidden font-helveticaNeue  text-[14px] font-normal leading-[14px] md:mt-[-1px] md:flex'>
                {name}
              </span>
              <div className='flex flex-col  font-normal md:hidden'>
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

  return { columnsBorrow, modalPropsBorrowing }
}

export default useColumnsBorrow
