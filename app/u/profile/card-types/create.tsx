'use client'

import { createCardType } from '@/app/u/profile/actions'
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

type CreateCardTypeDialogProps = {
  children: React.ReactNode
}

type ErrorState = string | undefined

const initialState = undefined

const CreateCardTypeDialog = ({ children }: CreateCardTypeDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCardType, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorState>(undefined)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
      formRef.current?.reset()
      setErrorMessage('')
    } else if (state?.status === 'error') {
      setErrorMessage(state.message)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <div className='mb-4'>
            <Label htmlFor='name'>Hours on card</Label>
            <Input id='hours' name='hours' type='number' required />
            {state?.errors?.hours && (
              <p className='py-2 text-xs text-red-500'>{state.errors.hours}</p>
            )}
          </div>
          <div>
            <Label htmlFor='price'>Price</Label>
            <Input id='price' name='price' type='number' required />
            {state?.errors?.price && (
              <p className='py-2 text-xs text-red-500'>{state.errors.price}</p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div>
            {errorMessage && (
              <p className='py-2 text-xs text-red-500'>{errorMessage}</p>
            )}
          </div>
          <DialogClose asChild>
            <Button variant='outline' className='mr-2'>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton normal='Add card type' going='Adding  card type...' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardTypeDialog
