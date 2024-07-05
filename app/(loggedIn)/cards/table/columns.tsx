'use client'

import { DataTableColumnHeader } from '@/app/(loggedIn)/components/data-table-column-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import DeleteCardDialog from '../delete'
import UpdateCardDialog from '../update'
import { statuses } from './helpers'

type DialogState = 'update' | 'delete' | null
type CardWithClient = Tables<'cards'> & {
  clients: Tables<'clients'>
}

export const columns: ColumnDef<Tables<'cards'>>[] = [
  {
    accessorKey: 'readable_id',
    header: '#id',
  },
  {
    accessorKey: 'created_at',
    header: 'Starts',
    cell: ({ getValue }) => {
      const dateValue = getValue<string>()
      const formattedDate = format(new Date(dateValue), 'dd/MM/yyyy')
      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'clients.name',
    header: 'Client',
    cell: ({ row }) => {
      const card = row.original as CardWithClient
      return (
        <Link href={`/clients/${card.clients.id}`}>{card.clients.name}</Link>
      )
    },
  },
  {
    accessorKey: 'hours_left',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remaining' />
    ),
    cell: ({ row }) => {
      const hoursLeft = row.original.hours_left
      const hours = row.original.hours
      return `${hoursLeft}/${hours}`
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Active' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('is_active')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => {
      const price = getValue<number>()
      return <span>€{price}</span>
    },
  },

  {
    accessorKey: 'ends_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Valid until' />
    ),
    cell: ({ getValue }) => {
      const endsAt = getValue<string | number>()
      const isBeforeEndDate = new Date() < new Date(endsAt)
      const dateValue = getValue<string>()
      const formattedDate = format(new Date(dateValue), 'dd/MM/yyyy')
      const className = clsx({
        'text-orange-500': !isBeforeEndDate,
      })
      return <span className={className}>{formattedDate}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = (card: Tables<'cards'>) => {
  const [dialog, setDialog] = useState<DialogState>(null)
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
          <DropdownMenuItem>
            <Link href={`/cards/${card.id}`}>View details</Link>
          </DropdownMenuItem>
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
        <DeleteCardDialog
          card={card}
          onOpenChange={() => setDialog(null)}
          open={dialog === 'delete'}
        />
      )}
      {dialog === 'update' && (
        <UpdateCardDialog
          key={dialogKey}
          open={dialog === 'update'}
          setDialog={setDialog}
          card={card}
          onFinished={resetDialog}
        />
      )}
    </>
  )
}
