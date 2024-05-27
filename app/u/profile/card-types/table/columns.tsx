'use client'

import { Tables } from '@/types/supabase'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import DeleteCardTypeDialog from '../delete'
import { useState } from 'react'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

type DialogState = 'update' | 'delete' | null

export const columns: ColumnDef<Tables<'card_types'>>[] = [
  {
    accessorKey: 'hours',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Hours
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => {
      const price = getValue() as number
      return <span>€{price}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions {...row.original} />,
  },
]

const Actions = (cardType: Tables<'card_types'>) => {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            className='text-red-500'
            onClick={() => setDialog('delete')}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === 'delete' && (
        <DeleteCardTypeDialog
          cardType={cardType}
          onOpenChange={() => setDialog(null)}
          open={dialog === 'delete'}
        />
      )}
    </>
  )
}
