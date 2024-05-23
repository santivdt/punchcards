'use client'

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
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteClient } from './actions'

type DeleteFormProps = {
  open?: boolean
  clientId: string
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = undefined

const DeleteClientDialog = ({
  open,
  clientId,
  children,
  onOpenChange,
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteClient, initialState)

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
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription> Hi </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type='hidden' name='clientId' value={clientId} />
          <div className='flex items-center gap-2'>
            <DialogClose asChild>
              <Button type='button'>Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteClientDialog

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button variant='destructive' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
