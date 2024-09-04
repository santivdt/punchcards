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
      <Button>
        <Plus size={16} className='mr-1' /> New
      </Button>
    </CreateClientDialog>
  )
}

export default InterMediateCreateClient
