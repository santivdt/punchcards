'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { resetPassword } from './action'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'
import { initialState } from '@/utils'
import { createClient } from '@/utils/supabase/client'

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(resetPassword, initialState)

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {})
  })

  return (
    <>
      <form action={formAction} className='w-[300px]'>
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
