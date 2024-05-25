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
import { Label } from '@/components/ui/label'
import { Tables } from '@/types/supabase'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CreateClientDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[]
  cardTypes: Tables<'card_types'>
}

const initialState = undefined

const CreateCardDialog = ({
  children,
  clients,
  cardTypes,
}: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCard, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false)
      formRef.current?.reset()
    }
  }, [state])
  // TODO make sure that it is required to fill in a client and hours
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <div className='mb-4'>
            <Label htmlFor='client_id' className='mb-2'>
              Client
            </Label>
            <Select name='client_id'>
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Select client' />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
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
            <Select name='hours'>
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Select size' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={cardTypes.hours_1.toString()}>
                  {cardTypes.hours_1}
                </SelectItem>
                <SelectItem value={cardTypes.hours_2.toString()}>
                  {cardTypes.hours_2}
                </SelectItem>
                <SelectItem value={cardTypes.hours_3.toString()}>
                  {cardTypes.hours_3}
                </SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.hours && (
              <p className='py-2 text-xs text-red-500'>{state.errors.hours}</p>
            )}
          </div>
          <p aria-live='polite' className='sr-only'>
            {state?.message}
          </p>
          <DialogClose asChild>
            <Button variant='outline' className='mr-2'>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton normal='Add card' going='Adding  card...' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardDialog
