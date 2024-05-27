'use client'

import { createClient } from '@/app/u/clients/actions'
import SubmitButton from '@/components/submitbutton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

type CreateClientDialogProps = {
  children: React.ReactNode
}

const initialState = undefined

const CreateClientDialog = ({ children }: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createClient, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
      formRef.current?.reset()
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <div className='mb-4'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='John Doe'
              required
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
              placeholder='johndoe@example.com'
              required
            />
            {state?.errors?.email && (
              <p className='py-2 text-xs text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <DialogClose asChild>
            <Button variant='outline' className='mr-2'>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton normal='Add client' going='Adding  client...' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateClientDialog
