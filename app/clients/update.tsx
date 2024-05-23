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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateClient } from './actions'
import { Tables } from '@/types/supabase'

type UpdateClientDialogProps = {
  open?: boolean
  children?: React.ReactNode
  client: Tables<'clients'>
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = undefined

const UpdateClientDialog = ({
  open,
  children,
  client,
  onOpenChange,
}: UpdateClientDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateClient, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      formRef.current?.reset()
    }
  }, [onOpenChange, state?.status])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update client</DialogTitle>
          <DialogDescription>You are updating {client.name}</DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction}>
          <input type='hidden' name='clientId' defaultValue={client.id} />
          <div className='mb-4'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              defaultValue={client.name}
            />
            {state?.errors?.name && (
              <p className='py-2 text-xs text-red-500'>{state.errors.name}</p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='text'
              defaultValue={client.email}
            />
            {state?.errors?.email && (
              <p className='py-2 text-xs text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Updating...' : 'Update'}
    </Button>
  )
}

export default UpdateClientDialog
