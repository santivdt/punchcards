'use client'

import FormError from '@/app/(protected)/components/form-error'
import { SubmitButton } from '@/app/(public)/login/submit-button'
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
import { ErrorType } from '@/types/custom-types'
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { deleteCard } from './actions'

type DeleteFormProps = {
  open?: boolean
  card: Tables<'cards'>
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const DeleteCardDialog = ({
  open,
  card,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteCard, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      setErrorMessage('')
      toast.success('Card deleted successfully')
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
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type='hidden' name='cardId' value={card.id} />
          <FormError errorMessage={errorMessage} />
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pendingText='Deleteing..'> Delete </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCardDialog
