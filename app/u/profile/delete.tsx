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
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { deleteUser } from './actions'

type DeleteFormProps = {
  open?: boolean
  userId: string
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const initialState = undefined

const DeleteUserDialog = ({
  open,
  userId,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteUser, initialState)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
    }
  }, [onOpenChange, state?.status])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type='hidden' name='id' defaultValue={userId} />
          {state?.errors?.id && (
            <p className='py-2 text-xs text-red-500'>{state.errors.id}</p>
          )}
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

export default DeleteUserDialog
