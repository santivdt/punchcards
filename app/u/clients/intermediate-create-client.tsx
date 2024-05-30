'use client'

import { Button } from '@/components/ui/button'
import { SquarePlus } from 'lucide-react'
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
      <Button variant='ghost'>
        <SquarePlus className='dark:text-white mr-2' size={16} /> Add client
      </Button>
    </CreateClientDialog>
  )
}

export default InterMediateCreateClient
