'use client'

import { Button } from '@/components/ui/button'
import { CardWithClient } from '@/types/custom-types'
import { Clock } from 'lucide-react'
import { useCallback, useState } from 'react'
import CreateHourDialog from './create'

type InterMediateCreateHourProps = {
  type?: 'default' | 'secondary'
  activeCards: CardWithClient[] | null
}

const InterMediateCreateHour = ({
  type,
  activeCards,
}: InterMediateCreateHourProps) => {
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(
    () => setDialogKey((prevState) => prevState + 1),
    []
  )

  return (
    <CreateHourDialog
      key={dialogKey}
      onFinished={resetDialog}
      activeCards={activeCards}
    >
      {type === 'secondary' ? (
        <Button
          variant='secondary'
          className='text-sm h-8 pl-2 pr-3 rounded-md gap-1  dark:bg-neutral-900 border-neutral-300 dark:text-neutral-300 bg-neutral-100 text-slate-12 hover:bg-slate-4 focus-visible:ring-2 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-4 disabled:hover:bg-slate-4 inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
        >
          <Clock size={16} /> Add time
        </Button>
      ) : (
        <Button
          variant='default'
          className='text-sm h-8 pl-3 pr-3 rounded-md gap-1 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 cursor-pointer'
        >
          <Clock size={16} /> Add time
        </Button>
      )}
    </CreateHourDialog>
  )
}

export default InterMediateCreateHour
