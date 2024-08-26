'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { resetPassword } from './action'
import SubmitButton from '@/app/(protected)/components/submitbutton'
import { initialState } from '@/utils'
import { createClient } from '@/utils/supabase/client'

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(resetPassword, initialState)
  const [errorMessages, setErrorMessages] = useState<string | undefined>()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {})
  })

  useEffect(() => {
    if (formState?.status === 'error') {
      setErrorMessages(formState.message)
    }
  }, [formState?.status, formState?.message])

  return (
    <>
      <form action={formAction} className='w-[300px]'>
        {errorMessages && <p className='text-red-700'>{errorMessages}</p>}
        <Label htmlFor='password'>New password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          required
          className='my-4'
        />
        <SubmitButton going='Updating' normal='Update password' />
      </form>
    </>
  )
}

export default ResetPasswordForm
