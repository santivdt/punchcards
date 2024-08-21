'use client'

import FormError from '@/app/(protected)/components/form-error'
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
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { deleteClient } from './actions'
import { Sub } from '@radix-ui/react-dropdown-menu'

type DeleteFormProps = {
  open?: boolean
  client: Tables<'clients'>
  children?: React.ReactNode
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const DeleteClientDialog = ({
  open,
  client,
  children,
  onOpenChange = () => {},
}: DeleteFormProps) => {
  const [state, formAction] = useFormState(deleteClient, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success('Client deleted successfully')
    }
  }, [state?.status])

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      formRef.current?.reset()
      setErrorMessage('')
    } else if (state?.status === 'error') {
      setErrorMessage(state.message)
    }
  }, [state, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>You are deleting {client.name}</DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef}>
          <input type='hidden' name='clientId' value={client.id} />
          <FormError errorMessage={errorMessage} />
          <div className='flex items-center justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
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

export default DeleteClientDialog
