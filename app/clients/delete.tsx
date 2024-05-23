'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteClient } from './actions'
import { useEffect, useState } from 'react'

type DeleteFormProps = {
  clientId: string
  children: React.ReactNode
}

const initialState = undefined

const DeleteForm = ({ clientId, children }: DeleteFormProps) => {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(deleteClient, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription> Hi </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input type='hidden' name='clientId' value={clientId} />
          <SubmitButton />
          <DialogClose asChild>
            <Button type='button'>Cancel</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteForm

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button variant='destructive' disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
