'use client'

import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import { createCardType } from './actions'
import { Tables } from '@/types/supabase'
import { DataTable } from './card-types/table'
import { columns } from './card-types/table/columns'
import CreateCardTypeDialog from './card-types/create'
import { Button } from '@/components/ui/button'

const initialState = undefined

type CardTypeFormProps = {
  cardTypes: Tables<'card_types'>[] | null
}

const CardTypeForm = ({ cardTypes }: CardTypeFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCardType, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      formRef.current?.reset()
    }
  }, [state?.status])

  return (
    <div className='mt-4'>
      {cardTypes && <DataTable columns={columns} data={cardTypes} />}{' '}
      <CreateCardTypeDialog>
        <Button className='mt-4' variant='secondary'>
          Create card type
        </Button>
      </CreateCardTypeDialog>
    </div>
  )
}

export default CardTypeForm
