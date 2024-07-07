'use client'

import { checkEmail, createClient } from '@/app/(loggedIn)/clients/actions'
import FormError from '@/app/(loggedIn)/components/form-error'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorType } from '@/types/custom-types'
import { initialState } from '@/utils'
import { useCallback, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

type CreateClientDialogProps = {
  children: React.ReactNode
  onFinished: () => void
}

const CreateClientDialog = ({
  children,
  onFinished,
}: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const [emailIsDouble, setEmailIsDouble] = useState(false)
  const [state, formAction] = useFormState(createClient, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(undefined)

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
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
      if (state.message) {
        toast.success(state.message)
      }
    } else if (state?.status === 'error') {
      if (state.message) {
        toast.error(state.message)
      }
    }
  }, [state?.status, state?.message])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <form action={formAction}>
          <div className='mb-4'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='John Doe'
              required
            />
            {state?.errors?.name ||
              (!emailIsDouble && (
                <p className='py-2 text-xs text-red-500'>
                  {state?.errors?.name}
                </p>
              ))}
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='text'
              placeholder='johndoe@example.com'
              required
              onBlur={async (e) => {
                const emailIsDouble = await checkEmail(e.target.value)
                if (emailIsDouble?.status === 'error') {
                  return setEmailIsDouble(true)
                }
                return setEmailIsDouble(false)
              }}
            />
            {state?.errors?.email ||
              (emailIsDouble && (
                <p className='py-2 text-xs text-red-500'>
                  {state?.errors?.email ||
                    'A client with this email already exists'}
                </p>
              ))}
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
