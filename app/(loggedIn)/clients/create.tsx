'use client'

import { checkEmail, createClient } from '@/app/(loggedIn)/clients/actions'
import FormError from '@/components/form-error'
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
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

type CreateClientDialogProps = {
  children: React.ReactNode
  onFinished: () => void
}

const initialState = undefined

const CreateClientDialog = ({
  children,
  onFinished,
}: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createClient, initialState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    setErrorMessage(
      state?.status === 'error' ? state?.message || 'Unknown error' : undefined
    )
    if (state?.status === 'success') onFinished()
  }, [onFinished, state?.message, state?.status])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) onFinished()
    },
    [onFinished]
  )

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success('Client added successfully')
    }
  }, [state?.status])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='text'
              placeholder='johndoe@example.com'
              required
              onBlur={(e) => {
                checkEmail(e.target.value)
              }}
            />
            {state?.errors?.email && (
              <p className='py-2 text-xs text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <FormError errorMessage={errorMessage} />
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div className='mt-4'>
            <DialogClose asChild>
              <Button variant='outline' className='mr-2'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton normal='Add client' going='Adding  client...' />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateClientDialog
