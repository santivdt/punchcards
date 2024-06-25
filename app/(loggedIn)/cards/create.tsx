'use client'

import { createCard } from '@/app/(loggedIn)/cards/actions'
import FormError from '@/app/(loggedIn)/components/form-error'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'
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
import { createSchema } from './schema'

type CreateCardDialogProps = {
  children: React.ReactNode
  clients: Tables<'clients'>[] | null
}

const CreateCardDialog = ({ children, clients }: CreateCardDialogProps) => {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(createCard, initialState)
  const [serverErrorMessage, setserverErrorMessage] =
    useState<ErrorType>(undefined)
  const [customEndDate, setCustomEndDate] = useState(false)
  const [clientErrorMessage, setClientErrorMessage] = useState<any>()

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

  //set error message from server
  useEffect(() => {
    setserverErrorMessage(
      state?.status === 'error' ? state?.message : undefined
    )
    if (state?.status === 'success' && state.message) {
      toast.success(state.message)
    }
  }, [state?.message, state?.status])

  // clear errormessages when you open and close the modal
  useEffect(() => {
    setserverErrorMessage(undefined)
    setClientErrorMessage(undefined)
  }, [open])

  // get zod errors from back-end to front-end
  useEffect(() => {
    if (state?.status === 'fields-error') {
      setClientErrorMessage(state.errors)
    }
  }, [state?.status, state?.errors])

  // make sure modal can open and close
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen)
  }, [])

  const validateFields = (formData: FormData) => {
    const validatedFields = createSchema.safeParse({
      client_id: formData.get('client_id'),
      hours: Number(formData.get('hours')),
      hours_left: Number(formData.get('hours')),
      price: Number(formData.get('price')),
      ends_at: formData.get('ends_at'),
    })

    if (!validatedFields.success) {
      return setClientErrorMessage(validatedFields.error.flatten().fieldErrors)
    }

    return validateFields
  }

  const handleBlur = useCallback(
    (field: string, value: string | number) => {},
    []
  )

  // TODO i am getting there but not sure if this is more optimal then the one with intermediate ?

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
            <form
              ref={formRef}
              action={async (formData) => {
                const validatedFields = validateFields(formData)

                const state = await createCard(validatedFields)
                if (state.status === 'success') {
                  formRef.current?.reset()
                  setOpen(false)
                  setClientErrorMessage(undefined)
                } else if (state.status === 'error') {
                  console.log(state)
                  setserverErrorMessage(state.message)
                }
              }}
            >
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
                {clientErrorMessage?.client_id && (
                  <p className='py-2 text-xs text-red-500'>
                    {clientErrorMessage.client_id}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <Label htmlFor='hours' className='mb-2'>
                  Hours
                </Label>
                <Input type='number' name='hours' id='hours' required />
                {clientErrorMessage?.hours && (
                  <p className='py-2 text-xs text-red-500'>
                    {clientErrorMessage.hours}
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
                  {clientErrorMessage?.price && (
                    <p className='py-2 text-xs text-red-500'>
                      {clientErrorMessage.price}
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
                    <Label htmlFor='ends_at' className='my-2 mr-2'>
                      Valid until
                    </Label>
                    <input
                      aria-label='Date'
                      type='date'
                      id='ends_at'
                      name='ends_at'
                      required
                      defaultValue={formattedDate}
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
              <FormError errorMessage={serverErrorMessage} />
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
