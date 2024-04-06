import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'

interface Table<T> {
  data: T[]
  columns: ColumnDef<T>[]
  sorting?: SortingState
  setSorting?: Dispatch<SetStateAction<SortingState>>
  className?: string
}

const Table = <T,>({ data, columns, sorting, setSorting, className }: Table<T>) => {
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
    <>
      <table className={`${className}`}>
        <thead className='relative'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='h-[56px] rounded-lg' key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={`relative z-10 text-sm font-normal text-[#C6C6C6] ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
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
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        <span className='absolute left-0 top-0 h-full w-full rounded-lg bg-[rgba(0,0,0,0.32)]'></span>
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
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className='border-b-[1px] border-b-[rgba(255,255,255,0.16)] py-2 text-center text-sm font-medium text-[#fff]'
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
    </>
  )
}

export default Table
