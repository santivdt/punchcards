'use client'

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
import { useState } from 'react'
import DeleteCardDialog from '../delete'
import UpdateCardDialog from '../update'

type DialogState = 'update' | 'delete' | null
type CardWithClient = Tables<'cards'> & {
  clients: Tables<'clients'>
}

export const columns: ColumnDef<Tables<'cards'>>[] = [
  {
    accessorKey: 'readable_id',
    header: '#',
  },
  {
    accessorKey: 'clients.name',
    header: 'Client',
    cell: ({ row }) => {
      const card = row.original as CardWithClient
      return (
        <Link href={`/u/clients/${card.clients.id}`}>{card.clients.name}</Link>
      )
    },
  },
  {
    accessorKey: 'hours_left',
    header: 'Remaining',
    cell: ({ row }) => {
      const hoursLeft = row.original.hours_left
      const hours = row.original.hours
      return `${hoursLeft}/${hours}`
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Active',
    cell: ({ getValue }) => {
      let text = 'No'
      if (getValue()) {
        text = 'Yes'
      }
      return text
    },
  },
  {
    accessorKey: 'ends_at',
    header: 'Valid until',
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
            <Link href={`/u/cards/hours/${card.id}`}>View hours</Link>
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
          open={dialog === 'update'}
          card={card}
          onOpenChange={() => setDialog(null)}
        />
      )}
    </>
  )
}
