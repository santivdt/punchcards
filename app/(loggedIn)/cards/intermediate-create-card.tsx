'use client'

import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import CreateCardDialog from './create'

type InterMediateCreateCardProps = {
  clients: Tables<'clients'>[] | null
}

const InterMediateCreateCard = ({ clients }: InterMediateCreateCardProps) => {
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(
    () => setDialogKey((prevState) => prevState + 1),
    []
  )

  return (
    <CreateCardDialog
      clients={clients}
      key={dialogKey}
      onFinished={resetDialog}
    >
      <Button
        variant='default'
        className='text-sm h-8 pl-3 pr-3 z-0 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
      >
        <Plus size={16} /> Add card
      </Button>
    </CreateCardDialog>
  )
}

export default InterMediateCreateCard
