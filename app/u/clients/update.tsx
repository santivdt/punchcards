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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tables } from '@/types/supabase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { updateClient } from './actions'

type UpdateClientDialogProps = {
  open?: boolean
  children?: React.ReactNode
  client: Tables<'clients'>
  onFinished: () => void
  setDialog: React.Dispatch<React.SetStateAction<'update' | 'delete' | null>>
}

const initialState = undefined

const UpdateClientDialog = ({
  open,
  children,
  client,
  onFinished,
  setDialog,
}: UpdateClientDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateClient, initialState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    setErrorMessage(
      state?.status === 'error' ? state?.message || 'Unknown error' : undefined
    )
    if (state?.status === 'success') onFinished()
  }, [onFinished, state?.message, state?.status])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      console.log(newOpen)
      setDialog(null)
      if (!newOpen) onFinished()
    },
    [onFinished, setDialog]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              required
              defaultValue={client.name ?? ''}
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
              required
              defaultValue={client.email ?? ''}
            />
            {state?.errors?.email && (
              <p className='py-2 text-xs text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div className='mb-4'>
            {errorMessage && (
              <p className='py-2 text-xs text-red-500'>{errorMessage}</p>
            )}
          </div>
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton normal='Update' going='Updating...' />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateClientDialog
