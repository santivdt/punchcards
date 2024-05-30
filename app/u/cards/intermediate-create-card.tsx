'use client'

import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { SquarePlus } from 'lucide-react'
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
      <Button variant='ghost'>
        <SquarePlus className='dark:text-white mr-2' size={16} /> Add card
      </Button>
    </CreateCardDialog>
  )
}

export default InterMediateCreateCard
