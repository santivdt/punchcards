'use client'

import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { SquarePlus } from 'lucide-react'
import { useCallback, useState } from 'react'
import CreateHourDialog from './create'

type InterMediateCreateHourProps = {
  clients: Tables<'clients'>[] | null
}

const InterMediateCreateHour = ({ clients }: InterMediateCreateHourProps) => {
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(
    () => setDialogKey((prevState) => prevState + 1),
    []
  )

  return (
    <CreateHourDialog
      clients={clients}
      key={dialogKey}
      onFinished={resetDialog}
    >
      <Button variant='ghost'>
        <SquarePlus className='dark:text-white mr-2' size={16} /> Add task
      </Button>
    </CreateHourDialog>
  )
}

export default InterMediateCreateHour
