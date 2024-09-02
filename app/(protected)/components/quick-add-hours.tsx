'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardWithClient } from '@/types/custom-types'
import { initialState } from '@/utils'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { createHour } from '../hours/actions'
import SubmitButton from './submitbutton'

const QuickAddHours: React.FC<{ activeCards: CardWithClient[] | null }> = ({
  activeCards,
}) => {
  const currentDate = new Date().toISOString().slice(0, 10)
  const [formStatus, formAction] = useFormState(createHour, initialState)
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formStatus && formStatus?.status === 'success' && formStatus.message) {
      toast.success(formStatus.message)
      ref.current?.reset()
    } else if (
      formStatus &&
      formStatus.status === 'error' &&
      formStatus.message
    ) {
      toast.error(formStatus.message)
    }
  }, [formStatus])

  return (
    <form className='flex' action={formAction} ref={ref}>
      <input type='hidden' name='date' id='date' value={currentDate} />
      <Input
        id='description'
        name='description'
        type='text'
        placeholder='What did you do?'
        required
        className='w-[240px] mr-2'
      />
      <Input
        id='duration'
        name='duration'
        type='number'
        placeholder='1 hr'
        step='0.5'
        className='w-[60px] mr-2'
        required
      />
      <Select name='card_id' required>
        <SelectTrigger className='w-[240px] mr-2'>
          <SelectValue placeholder='Select card' />
        </SelectTrigger>
        <SelectContent>
          {activeCards?.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              {card.clients?.name} - {card.hours_left}/{card.hours}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitButton going='Adding..' normal='Add' />
    </form>
  )
}

export default QuickAddHours
