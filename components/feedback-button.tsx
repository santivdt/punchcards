'use client'

import { createFeedback } from '@/app/(website)/signup/actions'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { MessageSquareMore } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import FormError from './form-error'
import SubmitButton from './submitbutton'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const initialState = undefined

const FeedbackButton = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(createFeedback, initialState)
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    if (formState) {
      if (formState.status === 'success' && formState.message) {
        setOpen(false)
        setErrorMessage(undefined)
        toast.success(formState.message)
      } else if (formState.status === 'error' && formState.message) {
        setErrorMessage(formState.message)
      }
    }
  }, [formState])

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          className='mr-2 items-center'
          variant='outline'
          onClick={() => setOpen(!open)}
        >
          <MessageSquareMore size={15} className='mr-1' />
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] z-50 mr-8 mt-2 p-4 bg-white dark:bg-black border border-neutral-300 rounded'>
        <form ref={formRef} action={formAction}>
          <Label htmlFor='feedback'>Feedback</Label>
          <Textarea
            className='mb-4 mt-2 z-51'
            id='feedback'
            name='feedback'
            placeholder='Ideas to improve the app...'
          />
          <FormError errorMessage={errorMessage} />
          <SubmitButton going='Sending..' normal='Send' />
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackButton
