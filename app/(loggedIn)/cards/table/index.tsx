'use client'

import { DataTablePagination } from '@/app/(loggedIn)/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useWindowSize } from '@/utils/client-utils'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData>[] | null
  data: TData[] | null
}

export const DataTable = <TData extends TValue, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({})
  const windowSize = useWindowSize()
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    price: false,
    created_at: false,
    readable_id: windowSize.width <= 800 ? false : true,
    is_active: windowSize.width <= 800 ? false : true,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  //TODO im not sure i use this windowsize correctly. i have to suppres hyration warnings now. think i need to dynamically import it but dk how
  useEffect(() => {
    if (windowSize) {
      setColumnVisibility((prev) => ({
        ...prev,
        readable_id: windowSize.width > 800,
        is_active: windowSize.width > 800,
      }))
    }
  }, [windowSize])

  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
  })

  return (
    <div className='py-4' suppressHydrationWarning>
      <DataTableToolbar table={table} />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data && data.length > 10 && (
        <div className='mt-5'>
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
}
