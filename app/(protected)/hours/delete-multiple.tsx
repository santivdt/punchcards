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
import { deleteHours } from './actions'

type DeleteFormProps = {
  open?: boolean
  hours: Tables<'hours'>[]
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
  rowSelection: { [key: string]: boolean }
  setRowSelection?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
}

const DeleteHoursDialog = ({
  open,
  hours,
  children,
  rowSelection,
  onOpenChange = () => {},
  setRowSelection,
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteHours, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      setErrorMessage
      toast.success('Entries deleted successfully')
      state.message = ''
      state.status = ''
      if (setRowSelection) {
        setRowSelection({})
      }
    } else if (state?.status === 'error') {
      setErrorMessage(state.message)
    }
  }, [onOpenChange, state, setRowSelection])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. You are deleting{' '}
            {Object.keys(rowSelection).length} time entries.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input
            type='hidden'
            name='data'
            id='data'
            defaultValue={JSON.stringify(hours)}
          />
          <FormError errorMessage={errorMessage} />
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton pendingText='Deleting...'>Delete</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteHoursDialog
