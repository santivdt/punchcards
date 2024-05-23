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
import DeleteClientDialog from '../delete'
import { useState } from 'react'
import UpdateClientDialog from '../update'

export const columns: ColumnDef<Tables['clients']['Row']>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = ({ id }: Tables<'clients'>) => {
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
          <DropdownMenuItem onClick={() => setDialog('update')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/clients/${id}`}>View cards</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>View hours</DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-400'
            onClick={() => setDialog('delete')}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === 'delete' && (
        <DeleteClientDialog
          clientId={id}
          onOpenChange={setDialog}
          open={dialog === 'delete'}
        />
      )}

      {dialog === 'update' && (
        <UpdateClientDialog
          open={dialog === 'update'}
          clientId={id}
          clientName={name}
          onOpenChange={setDialog}
        />
      )}
    </>
  )
}
