import Dental from '@/components/common/table/dental'
import icAlert from '@/images/table/alert-circle-light.svg'
import { ColumnDef } from '@tanstack/react-table'

import BtnBorrow from '@/components/common/button/btn-borrow'
import BtnDetail from '@/components/common/button/btn-detail'

import { AssetsBorrow, Type } from '@/types/table'
import Image from 'next/image'

export const getDataColumnsAssetBorrow = ({
  onClickBorrow,
  onClickDetails,
}: {
  onClickBorrow: ({ data, type }: { data: AssetsBorrow; type: Type }) => void
  onClickDetails: ({ data }: { data: AssetsBorrow }) => void
}): ColumnDef<AssetsBorrow>[] => [
  {
    id: 'assets',
    accessorKey: 'assets',
    header: () => <span className=' gap-2 text-left font-medium leading-[14px]'>Asset</span>,
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
        <figure className='flex items-center justify-start gap-2 pl-4'>
          <span className='font-medium leading-[14px]'>Available</span>

          <div>
            <Image src={icAlert} alt='icon alert' sizes='16' id='available' />
          </div>
        </figure>
      )
    },
    enableSorting: false,
    cell: (info) => {
      return (
        <figure style={{ marginBottom: '3px' }} className='  flex w-[70px] items-center justify-start  gap-[6px]  pl-4'>
          <div className='flex flex-col items-start justify-start gap-1 text-left md:flex-row md:gap-2  lg:items-center'>
            <div className=' text-left'>{Number(info.getValue())}</div>

            <div className=' flex text-[12px]  font-normal leading-[14px] text-[#8F9399] md:pt-[2px] lg:text-[12px]'>
              <div className='hidden leading-[14px] md:flex'>{'('}</div>
              <div className='leading-[14px]'>${Number(info.row.original.balanceValue)}</div>
              <div className='hidden leading-[14px] md:flex'>{')'}</div>
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
        <figure className='hidden items-center justify-end gap-2 md:flex'>
          <span className='font-medium leading-[14px]'>APY, variable</span>
          <Image src={icAlert} alt='icon alert' sizes='16' id='apy' />
        </figure>
      )
    },
    enableSorting: false,
    cell: (info) => {
      return (
        <div className='hidden w-[70px] items-center justify-start gap-2  md:flex'>
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
        <div style={{ justifyContent: 'end', paddingRight: '6px' }} className=' flex items-center justify-end gap-2 '>
          <BtnBorrow
            onClick={() => {
              const data = info.row.original
              onClickBorrow({
                data: data,
                type: 'borrow',
              })
            }}
          />
          <BtnDetail
            onClick={() => {
              const data = info.row.original
              onClickDetails({
                data: data,
              })
            }}
          />
        </div>
      )
    },
    footer: (props) => props.column.id,
  },
]
