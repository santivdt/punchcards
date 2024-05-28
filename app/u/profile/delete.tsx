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
import { Tables } from '@/types/supabase'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { deleteUser } from './actions'

//TODO type of user should be auth user?
type DeleteFormProps = {
  open?: boolean
  user: Tables<'profiles'>
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const initialState = undefined

const DeleteUserDialog = ({
  open,
  user,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteUser, initialState)
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
          <input type='hidden' name='id' defaultValue={user.id} />
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
