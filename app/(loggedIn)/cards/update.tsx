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
import { Tables } from '@/types/supabase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import FormError from '@/components/form-error'
import { Euro } from 'lucide-react'
import toast from 'react-hot-toast'
import { updateCard } from './actions'

type UpdateCardDialogProps = {
  open?: boolean
  children?: React.ReactNode
  card: Tables<'cards'>
  onFinished: () => void
  setDialog: React.Dispatch<React.SetStateAction<'update' | 'delete' | null>>
}

const initialState = undefined

const UpdateCardDialog = ({
  children,
  card,
  open,
  onFinished,
  setDialog,
}: UpdateCardDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateCard, initialState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
    if (state?.status === 'success') {
      onFinished()
      toast.success('Card updated successfully')
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form ref={formRef} action={formAction}>
          <input type='hidden' name='card_id' defaultValue={card.id} />
          <div className='mb-4'>
            <Label htmlFor='hours' className='mb-2'>
              Hours
            </Label>
            <Input
              type='number'
              name='hours'
              id='hours'
              defaultValue={card.hours?.toString() ?? ''}
              required
            />
            {state?.errors?.hours && (
              <p className='py-2 text-xs text-red-500'>{state.errors.hours}</p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='price' className='mb-2'>
              Price
            </Label>
            <div className='relative flex items-center max-w-2xl '>
              <Euro className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
              <Input
                type='number'
                name='price'
                id='price'
                required
                className='pl-6'
                defaultValue={card.price?.toString() ?? ''}
              />
              {state?.errors?.hours && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.price}
                </p>
              )}
            </div>
          </div>
          <FormError errorMessage={errorMessage} />
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
