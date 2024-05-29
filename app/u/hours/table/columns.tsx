'use client'

import DeleteHourDialog from '@/app/u/hours/delete'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/types/supabase'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import UpdateHourDialog from '../update'

type DialogState = 'update' | 'delete' | null
type HourWithClient = Tables<'hours'> & {
  clients: Tables<'clients'>
}

export const columns: ColumnDef<Tables<'hours'>>[] = [
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ getValue }) => {
      const dateValue = getValue<string>()
      const formattedDate = format(new Date(dateValue), 'dd/MM/yyyy')
      return formattedDate
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
      const durationInHours = getValue<number>()
      const hours = Math.floor(durationInHours)
      const minutes = Math.round((durationInHours - hours) * 60)
      return `${hours}h ${minutes}m`
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
          {pathname != `/cards/${hour.card_id}/hours` && (
            <DropdownMenuItem>
              <Link href={`/u/cards/${hour.card_id}/hours`}>View card</Link>
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
          hour={hour}
          onOpenChange={() => setDialog(null)}
          open={dialog === 'update'}
        />
      )}
    </>
  )
}
