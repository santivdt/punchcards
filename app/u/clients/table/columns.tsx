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
import { useCallback, useState } from 'react'
import DeleteClientDialog from '../delete'
import UpdateClientDialog from '../update'

type DialogState = 'update' | 'delete' | null

export const columns: ColumnDef<Tables<'clients'>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const client = row.original
      return <Link href={`/u/clients/${client.id}`}>{client.name}</Link>
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = (client: Tables<'clients'>) => {
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
          <DropdownMenuItem onClick={() => setDialog('update')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/u/clients/${client.id}/cards`}>View cards</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/u/clients/${client.id}/hours`}>View hours</Link>
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
        <DeleteClientDialog
          client={client}
          onOpenChange={() => setDialog(null)}
          open={dialog === 'delete'}
        />
      )}

      {dialog === 'update' && (
        <UpdateClientDialog
          open={dialog === 'update'}
          client={client}
          key={dialogKey}
          setDialog={setDialog}
          onFinished={resetDialog}
        />
      )}
    </>
  )
}
