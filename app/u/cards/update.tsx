'use client'

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
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'

import { updateCard } from './actions'

type UpdateCardDialogProps = {
  open?: boolean
  children?: React.ReactNode
  card: Tables<'cards'>
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | (() => void)
}

const initialState = undefined

const UpdateCardDialog = ({
  children,
  card,
  open,
  onOpenChange = () => {},
}: UpdateCardDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateCard, initialState)

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
          <input type='hidden' name='card_id' defaultValue={card.id} />
          <div className='mb-4'>
            <Label htmlFor='hours' className='mb-2'>
              Hours on card
            </Label>
            <Select
              name='hours'
              defaultValue={card.hours?.toString() ?? ''}
              required
            >
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Select size' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='30'>30</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.hours && (
              <p className='py-2 text-xs text-red-500'>{state.errors.hours}</p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='hours_left' className='mb-2'>
              Hours left
            </Label>
            <Input
              name='hours_left'
              id='hours_left'
              defaultValue={card.hours_left?.toString() ?? ''}
              type='number'
              className='w-[240px]'
              required
            />

            {state?.errors?.hours_left && (
              <p className='py-2 text-xs text-red-500'>
                {state.errors.hours_left}
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
          <SubmitButton normal='Update card' going='Updating  card...' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCardDialog
