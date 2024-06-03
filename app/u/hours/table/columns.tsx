'use client'

import DeleteHourDialog from '@/app/u/hours/delete'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { formatDate } from '@/utils/format-date'
import { customFormatDuration } from '@/utils/format-duration'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import UpdateHourDialog from '../update'

type DialogState = 'update' | 'delete' | null
type HourWithClient = Tables<'hours'> & {
  clients: Tables<'clients'>
}

export const columns: ColumnDef<Tables<'hours'>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ getValue }) => {
      return formatDate(getValue<string>())
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ getValue }) => {
      return customFormatDuration(getValue<number>())
    },
  },
  {
    accessorKey: 'clients.name',
    header: 'Client',
    cell: ({ row }) => {
      const hour = row.original as HourWithClient
      return (
        <Link href={`/u/clients/${hour.client_id}`}>{hour.clients.name}</Link>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = (hour: Tables<'hours'>) => {
  const [dialog, setDialog] = useState<DialogState>(null)
  const pathname = usePathname()
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(() => {
    setDialogKey((prevState) => prevState + 1)
    setDialog(null)
  }, [])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-8 h-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {pathname != `/cards/${hour.card_id}` && (
            <DropdownMenuItem>
              <Link href={`/u/cards/${hour.card_id}`}>View card</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => setDialog('update')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-400'
            onClick={() => setDialog('delete')}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === 'delete' && (
        <DeleteHourDialog
          hour={hour}
          onOpenChange={() => setDialog(null)}
          open={dialog === 'delete'}
        />
      )}

      {dialog === 'update' && (
        <UpdateHourDialog
          key={dialogKey}
          open={dialog === 'update'}
          setDialog={setDialog}
          hour={hour}
          onFinished={resetDialog}
        />
      )}
    </>
  )
}
