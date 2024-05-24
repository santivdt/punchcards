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
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
// import DeleteClientDialog from '../delete'
import { useState } from 'react'
// import UpdateClientDialog from '../update'

export const columns: ColumnDef<Tables['cards']>[] = [
  {
    accessorKey: 'readable_id',
    header: '#',
  },
  {
    accessorKey: 'clients.name',
    header: 'Client',
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
    accessorKey: 'ends_at',
    header: 'Valid until',
    cell: ({ getValue }) => {
      const dateValue = getValue<string>()
      const formattedDate = format(new Date(dateValue), 'dd/MM/yyyy')
      return formattedDate
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = (cards: Tables<'cards'>) => {
  const [dialog, setDialog] = useState(null)

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
          {/* <DropdownMenuItem onClick={() => setDialog('update')}> */}
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View hours</DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-400'
            // onClick={() => setDialog('delete')}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {dialog === 'delete' && (
        <DeleteClientDialog
          client={client}
          onOpenChange={setDialog}
          open={dialog === 'delete'}
        />
      )}

      {dialog === 'update' && (
        <UpdateClientDialog
          open={dialog === 'update'}
          client={client}
          onOpenChange={setDialog}
        />
      )} */}
    </>
  )
}
