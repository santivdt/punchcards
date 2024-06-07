'use client'

import { createHour } from '@/app/u/hours/actions'
import SubmitButton from '@/components/submitbutton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'

import FormError from '@/components/form-error'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tables } from '@/types/supabase'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

type CreateHourDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[] | null
  onFinished: () => void
}

type ErrorState = string | undefined

const initialState = undefined

const CreateHourDialog = ({
  children,
  clients,
  onFinished,
}: CreateHourDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createHour, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorState>(undefined)

  const currentDate = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
    if (state?.status === 'success') {
      onFinished()
      toast.success('Task added successfully')
    }
  }, [onFinished, state?.message, state?.status])

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) onFinished()
    },
    [onFinished]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {clients && clients.length > 0 ? (
          <form ref={formRef} action={formAction}>
            <div className='mb-4'>
              <Label htmlFor='client_id'>Client</Label>
              <Select name='client_id' required>
                <SelectTrigger className='w-[240px]'>
                  <SelectValue placeholder='Select client' />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.client_id && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.client_id}
                </p>
              )}
            </div>
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
                defaultValue={currentDate}
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
                step='0.5'
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
            <FormError errorMessage={errorMessage} />
            <DialogClose asChild>
              <Button variant='outline' className='mr-2'>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton normal='Add task' going='Adding  task...' />
          </form>
        ) : (
          <p>
            Add{' '}
            <Link href='/u/clients' className='border-b border-slate-800'>
              clients
            </Link>{' '}
            first.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateHourDialog
