'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { MessageSquareMore } from 'lucide-react'
import SubmitButton from './submitbutton'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const FeedbackButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='mr-2 items-center' variant='outline'>
          <MessageSquareMore size={15} className='mr-1' />
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] mr-8 mt-2'>
        <form>
          <Textarea className='mb-2' />

          <SubmitButton going='Sending..' normal='Send' />
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackButton
