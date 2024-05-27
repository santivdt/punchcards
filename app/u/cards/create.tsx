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
import Link from 'next/link'

type CreateClientDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[] | null
  cardTypes: Tables<'card_types'>[] | null
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {cardTypes && cardTypes.length > 0 ? (
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
              <Select name='hours' required>
                <SelectTrigger className='w-[240px]'>
                  <SelectValue placeholder='Select size' />
                </SelectTrigger>
                <SelectContent>
                  {cardTypes?.map((card) => (
                    <SelectItem key={card.id} value={card.id}>
                      {card.hours}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.hours && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.hours}
                </p>
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
        ) : (
          <p>
            Please add the kind of prepaid cards you sell first at your{' '}
            <Link href='/u/profile' className='border-b border-b-black'>
              profile page
            </Link>
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardDialog
