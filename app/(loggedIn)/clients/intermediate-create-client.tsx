'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import CreateClientDialog from './create'

const InterMediateCreateClient = () => {
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(
    () => setDialogKey((prevState) => prevState + 1),
    []
  )

  return (
    <CreateClientDialog key={dialogKey} onFinished={resetDialog}>
      <Button
        variant='default'
        className='text-md h-12 px-3 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
      >
        <Plus size={16} className='mr-1' /> New
      </Button>
    </CreateClientDialog>
  )
}

export default InterMediateCreateClient
