'use client'

import FormError from '@/app/(loggedIn)/components/form-error'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'
import { updateHour } from '@/app/(loggedIn)/hours/actions'
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
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

type UpdateHourDialogProps = {
  open?: boolean
  children?: React.ReactNode
  hour: Tables<'hours'>
  onFinished: () => void
  setDialog: React.Dispatch<React.SetStateAction<'update' | 'delete' | null>>
}

const UpdateHourDialog = ({
  children,
  hour,
  open,
  onFinished,
  setDialog,
}: UpdateHourDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateHour, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
    if (state?.status === 'success') {
      onFinished()
      toast.success('Task updated successfully')
    }
  }, [onFinished, state?.message, state?.status])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      console.log(newOpen)
      setDialog(null)
      if (!newOpen) onFinished()
    },
    [onFinished, setDialog]
  )

  const setDate = hour.date.toString().slice(0, 10)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <input type='hidden' name='hourId' value={hour.id} />
          <input type='hidden' name='cardId' value={hour.card_id} />
          <div className='mb-4 flex flex-col'>
            <Label htmlFor='date' className='my-2 mr-2'>
              Date
            </Label>
            <input
              aria-label='Date'
              type='date'
              id='date'
              name='date'
              required
              defaultValue={setDate || ''}
              className='w-[240px] p-2 border border-slate-800 dark:border-white rounded-md dark:bg-black'
            />
          </div>
          <div className='mb-4'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              name='description'
              type='text'
              placeholder='Built an app'
              defaultValue={hour.description || ''}
              required
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
              defaultValue={hour.duration || ''}
              required
              step='0.5'
            />
            {state?.errors?.duration && (
              <p className='py-2 text-xs text-red-500'>
                {state.errors.duration}
              </p>
            )}
          </div>
          <FormError errorMessage={errorMessage} />
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
