'use client'

import { updateHour } from '@/app/hours/actions'
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
import { Tables } from '@/types/supabase'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

type UpdateHourDialogProps = {
  open?: boolean
  children?: React.ReactNode
  hour: Tables<'hours'>
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const initialState = undefined

const UpdateHourDialog = ({
  children,
  hour,
  open,
  onOpenChange = () => {},
}: UpdateHourDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateHour, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      onOpenChange(false)
      formRef.current?.reset()
    } else if (state?.status === 'error') {
    }
  }, [onOpenChange, state?.status])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <input type='hidden' name='hourId' value={hour.id} />
          <div className='mb-4'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              name='description'
              type='text'
              placeholder='Built an app'
              defaultValue={hour.description ?? ''}
            />
            {state?.errors?.description && (
              <p className='py-2 text-xs text-red-500'>
                {state.errors.description}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='duration'>Duration</Label>
            <Input
              id='duration'
              name='duration'
              type='number'
              placeholder='0.5'
              defaultValue={hour.duration ?? ''}
            />
            {state?.errors?.duration && (
              <p className='py-2 text-xs text-red-500'>
                {state.errors.duration}
              </p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <div className='mb-4'></div>
          <DialogClose asChild>
            <Button variant='outline' className='mr-2'>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton normal='Update task' going='Updating  task...' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateHourDialog
