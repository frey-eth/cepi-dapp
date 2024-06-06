'use client'
import icUpDown from '@/icons/up.svg'

import icDental from '@/images/portfolio/dental.svg'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface Table<T> {
  data: T[]
  columns: ColumnDef<T>[]
  sorting?: SortingState
  setSorting?: Dispatch<SetStateAction<SortingState>>
  className?: string
  hasResponsive?: boolean
}

const Table = <T,>({ data, columns, sorting, setSorting, className, hasResponsive = false }: Table<T>) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ? sorting : undefined,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })
  return (
    <div className='flex'>
      <div className='table-custom   w-full overflow-y-auto'>
        <table className={`${className}`}>
          <thead className='relative'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className='relative h-[56px] rounded-lg' key={headerGroup.id}>
                {headerGroup.headers
                  .slice(0, hasResponsive ? headerGroup.headers.length - 1 : headerGroup.headers.length)
                  .map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              role='button'
                              className={`relative z-10 flex items-center gap-2 text-sm font-normal text-[#C6C6C6] ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() === 'asc'
                                    ? 'Sort ascending'
                                    : header.column.getNextSortingOrder() === 'desc'
                                      ? 'Sort descending'
                                      : 'Clear sort'
                                  : undefined
                              }
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <Image src={icUpDown} alt='icon' />,
                                desc: <Image src={icUpDown} className='rotate-180' alt='icon' />,
                              }[header.column.getIsSorted() as string] ?? null}
                              {header.column.getCanSort() && header.column.getNextSortingOrder() === 'desc' && (
                                <Image src={icDental} alt='icon' />
                              )}
                            </div>
                          </>
                        )}
                      </th>
                    )
                  })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row) => {
                const visibleCells = row.getVisibleCells()
                const totalCells = visibleCells.length

                const firstHalfCells = visibleCells.slice(0, hasResponsive ? totalCells - 1 : totalCells)

                return (
                  <tr key={row.id} className=' h-[52px] border-b-[1px] border-b-[rgba(255,255,255,0.16)]'>
                    {firstHalfCells.map((cell) => {
                      return (
                        <td key={cell.id} className='  text-center text-sm font-medium text-[#fff]'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      {hasResponsive && (
        <div>
          <table className='mb-[10px] w-[110px] overflow-y-auto  md:hidden lg:table'>
            <thead className='relative'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className='relative h-[56px] rounded-lg' key={headerGroup.id}>
                  {headerGroup.headers.slice(-1).map((header) => {
                    return <th key={header.id} colSpan={header.colSpan} className=''></th>
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  const visibleCells = row.getVisibleCells()

                  const secondHalfCells = visibleCells.slice(-1)
                  return (
                    <tr key={row.id} className='h-[52px] border-b-[1px] border-b-[rgba(255,255,255,0.16)]'>
                      {secondHalfCells.map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className='  py-[6px] pl-4 text-center  text-sm font-medium text-[#fff]  md:py-[4px] '
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Table
