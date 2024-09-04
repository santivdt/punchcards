'use client'

import { Button } from '@/components/ui/button'
import { CardWithClient } from '@/types/custom-types'
import { Clock, Plus, PlusIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import CreateHourDialog from './create'

type InterMediateCreateHourProps = {
  type?: 'default' | 'secondary'
  activeCards: CardWithClient[] | null
  cardId?: string
}

const InterMediateCreateHour = ({
  type,
  activeCards,
  cardId,
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
      cardId={cardId}
    >
      {type === 'secondary' ? (
        <>
          <Button variant='secondary' className='hidden lg:inline-flex '>
            <PlusIcon size={16} /> New
          </Button>
          <Button variant='secondary' className='inline-flex lg:hidden '>
            <Clock size={16} />
          </Button>
        </>
      ) : (
        <Button variant='default'>
          <Plus size={16} className='mr-1' /> New
        </Button>
      )}
    </CreateHourDialog>
  )
}

export default InterMediateCreateHour
