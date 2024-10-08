'use client'

import { createCard } from '@/app/(protected)/cards/actions'
import FormError from '@/app/(protected)/components/form-error'
import { SubmitButton } from '@/app/(public)/login/submit-button'
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
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ErrorType } from '@/types/custom-types'
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Euro } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

type CreateClientDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[] | null
  onFinished: () => void
}

const CreateCardDialog = ({
  children,
  clients,
  onFinished,
}: CreateClientDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCard, initialState)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(undefined)
  const [formData, setFormData] = useState<FormData>(new FormData())
  const [customEndDate, setCustomEndDate] = useState(false)

  const handleSwitchChange = () => {
    setCustomEndDate(!customEndDate)
  }

  const today = new Date()
  const oneYearFromNow = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )
  const formattedDate = oneYearFromNow.toISOString().split('T')[0]

  useEffect(() => {
    setErrorMessage(state?.status === 'error' ? state?.message : undefined)
    if (state?.status === 'success') {
      onFinished()
      toast.success('Card added successfully')
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
        <p>
          {clients && clients.length === 0 ? (
            <div>
              Please add&nbsp;
              <Link href='/clients' className='border-b border-b-black'>
                clients&nbsp;
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
                <div className='relative flex items-center max-w-2xl '>
                  <Euro className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
                  <Input
                    type='number'
                    name='price'
                    id='price'
                    required
                    className='pl-6'
                  />
                  {state?.errors?.hours && (
                    <p className='py-2 text-xs text-red-500'>
                      {state.errors.price}
                    </p>
                  )}
                </div>
              </div>
              <div className='mb-4 flex flex-col'>
                <div className='flex items-center'>
                  <Switch
                    checked={customEndDate}
                    className='mr-2'
                    onCheckedChange={handleSwitchChange}
                  />
                  <span className=''>Set custom end date</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoCircledIcon className='ml-1' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>By default cards are valid for one year</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {customEndDate ? (
                  <>
                    <Label htmlFor='ends_at' className='mt-4 mb-2 mr-2'>
                      Valid until
                    </Label>
                    <input
                      aria-label='Date'
                      type='date'
                      id='ends_at'
                      name='ends_at'
                      required
                      defaultValue={formattedDate}
                      className='w-[240px] p-2 border border-slate-800 dark:border-white rounded-md dark:bg-black'
                    />
                  </>
                ) : (
                  <input
                    type='hidden'
                    aria-label='Date'
                    id='ends_at'
                    name='ends_at'
                    required
                    defaultValue={formattedDate}
                  />
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
              <SubmitButton pendingText='Adding card..'>Add card</SubmitButton>
            </form>
          )}
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCardDialog
