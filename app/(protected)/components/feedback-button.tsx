'use client'

import FormError from '@/app/(protected)/components/form-error'
import { SubmitButton } from '@/app/(public)/login/submit-button'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ErrorType } from '@/types/custom-types'
import { initialState } from '@/utils'
import { createFeedback } from '@/utils/server-utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { MessageSquareMore } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

const FeedbackButton = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(createFeedback, initialState)
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

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
          <SubmitButton pendingText='Sending..'>Send</SubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackButton
