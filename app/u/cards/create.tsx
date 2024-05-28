'use client'

import { createCard } from '@/app/u/cards/actions'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tables } from '@/types/supabase'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

type CreateClientDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[] | null
}

const initialState = undefined

type ErrorType = string | undefined

const CreateCardDialog = ({ children, clients }: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCard, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(undefined)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
      setErrorMessage(undefined)
    } else if (state?.status === 'error' && open === true) {
      setErrorMessage(state.message)
    } else if (state?.status === 'error' && open === false) {
      state.message = ''
      state.errors = {}
      setErrorMessage(undefined)
    }
  }, [state, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <p>
          {clients && clients.length === 0 ? (
            <div>
              Please add
              <Link href='/u/clients' className='border-b border-b-black'>
                clients
              </Link>
              first before you add a card.
            </div>
          ) : (
            <form ref={formRef} action={formAction}>
              <div className='mb-4'>
                <Label htmlFor='client_id' className='mb-2'>
                  Client
                </Label>
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
              <div className='mb-4'>
                <Label htmlFor='hours' className='mb-2'>
                  Hours
                </Label>
                <Input type='number' name='hours' id='hours' required />
                {state?.errors?.hours && (
                  <p className='py-2 text-xs text-red-500'>
                    {state.errors.hours}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <Label htmlFor='price' className='mb-2'>
                  Price
                </Label>
                <Input type='number' name='price' id='price' required />
                {state?.errors?.hours && (
                  <p className='py-2 text-xs text-red-500'>
                    {state.errors.price}
                  </p>
                )}
              </div>
              <p aria-live='polite' className='sr-only'>
                {state?.message}
              </p>
              <div className='mb-4'>
                {errorMessage && (
                  <p className='py-2 text-xs text-red-500'>{errorMessage}</p>
                )}
              </div>
              <DialogClose asChild>
                <Button variant='outline' className='mr-2'>
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton normal='Add card' going='Adding  card...' />
            </form>
          )}
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardDialog
