'use client'

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
import { initialState } from '@/utils'
import { useCallback, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { deleteUser } from './actions'

type DeleteFormProps = {
  open?: boolean
  userId: string
  children?: React.ReactNode
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  onFinished: () => void
}

const DeleteUserDialog = ({
  open,
  userId,
  children,
  setDeleteDialogOpen,
  onFinished,
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteUser, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
    if (state?.status === 'success') onFinished()
  }, [onFinished, state?.message, state?.status])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setDeleteDialogOpen(newOpen)
      if (!newOpen) onFinished()
    },
    [onFinished, setDeleteDialogOpen]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setDeleteDialogOpen(false)
                }}
              >
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

export default DeleteUserDialog
