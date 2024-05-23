'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'
import { updateProfile } from './actions'
import { Tables } from '@/types/supabase'
import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type UpdateProfileDialog = {
  children?: React.ReactNode
  user: Tables<'users'>
}

const initialState = undefined

const UpdateProfileDialog = ({ children, user }: UpdateProfileDialog) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateProfile, initialState)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
      formRef.current?.reset()
    }
  }, [open, state?.status])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>You are updating your profile</DialogDescription>
        </DialogHeader>
        <form action={formAction} className='mt-4 mb-4'>
          <input type='hidden' name='id' defaultValue={user.id} />
          <div className='flex'>
            <div className='mr-8'>
              <Label htmlFor='first_name'>First name</Label>
              <Input
                id='first_name'
                name='first_name'
                type='text'
                defaultValue={user.first_name}
              />
              {state?.errors?.first_name && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.first_name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor='last_name'>Last name</Label>
              <Input
                id='last_name'
                name='last_name'
                type='text'
                defaultValue={user.last_name}
              />
              {state?.errors?.last_name && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.last_name}
                </p>
              )}
            </div>
          </div>
          <div className='w-1/2 mt-4'>
            <Label htmlFor='company'>Company</Label>
            <Input
              id='company'
              name='company'
              type='text'
              defaultValue={user.company}
            />
            {state?.errors?.company && (
              <p className='py-2 text-xs text-red-500'>
                {state.errors.company}
              </p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div className='flex items-center gap-2 mt-4'>
            <SubmitButton />
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateProfileDialog

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Updating...' : 'Update'}
    </Button>
  )
}
