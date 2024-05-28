'use client'

import SubmitButton from '@/components/submitbutton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tables } from '@/types/supabase'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { deleteCardType } from '../actions'

type DeleteFormProps = {
  open?: boolean
  cardType: Tables<'card_types'>
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

type ErrorType = string | undefined

const initialState = undefined

const DeleteCardTypeDialog = ({
  open,
  cardType,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteCardType, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(undefined)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      setErrorMessage('')
    } else if (state?.status === 'error') {
      setErrorMessage(state.message)
    }
  }, [onOpenChange, state])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type='hidden' name='cardTypeId' value={cardType.id} />
          {errorMessage && (
            <p className='py-2 text-xs text-red-500'>{errorMessage}</p>
          )}
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton normal='Delete' going='Deleting...' />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCardTypeDialog
