'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTablePagination } from '@/app/(protected)/components/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { deleteHours } from '../actions'
import DeleteHoursDialog from '../delete-multiple'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData>[] | null
  data: TData[] | null
}

export const DataTable = <
  TData extends {
    card_id: string
    client_id: string
    date: string
    description: string
    duration: number
    id: string
    user_id: string
    created_at: string
  },
  TValue,
>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({})
  const [hoursToDelete, setHoursToDelete] = useState<Tables<'hours'>[]>([])
  const [state, formAction] = useFormState(deleteHours, initialState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.status === 'success') {
      setRowSelection({})
      toast.success('Tasks deleted successfully')
    }
  }, [state?.message, state?.status])

  useEffect(() => {
    if (data) {
      const filteredArray = data.filter((obj, index) => {
        const trueBooleanIndices = Object.entries(rowSelection)
          .filter(([, value]) => value === true)
          .map(([key]) => parseInt(key))

        return trueBooleanIndices.includes(index)
      })

      setHoursToDelete(filteredArray)
    }
  }, [rowSelection, data])

  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <div>
      <DeleteHoursDialog
        hours={hoursToDelete}
        onOpenChange={() => setOpen(false)}
        rowSelection={rowSelection}
        open={open}
        setRowSelection={setRowSelection}
      />
      <div className='min-h-[50px]'>
        {rowSelection && Object.keys(rowSelection).length > 0 && (
          <Button
            variant='outline'
            className='mb-2'
            onClick={() => setOpen(true)}
          >
            {Object.keys(rowSelection).length > 0 &&
              Object.keys(rowSelection).length < 2 && <span>Delete entry</span>}
            {Object.keys(rowSelection).length > 1 && (
              <span>Bulk delete entries</span>
            )}
          </Button>
        )}
      </div>
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
