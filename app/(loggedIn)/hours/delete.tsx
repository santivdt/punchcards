'use client'

import FormError from '@/app/(loggedIn)/components/form-error'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'
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
import toast from 'react-hot-toast'
import { deleteHour } from './actions'

type DeleteFormProps = {
  open?: boolean
  hour: Tables<'hours'>
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const initialState = undefined

type ErrorType = string | undefined

const DeleteHourDialog = ({
  open,
  hour,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteHour, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(undefined)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      setErrorMessage
      toast.success('Task deleted successfully')
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
          <input type='hidden' name='hourId' defaultValue={hour.id} />
          <input
            type='hidden'
            name='duration'
            defaultValue={hour.duration || ''}
          />
          <input
            type='hidden'
            name='cardId'
            defaultValue={hour.card_id || ''}
          />
          <FormError errorMessage={errorMessage} />
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

export default DeleteHourDialog
