'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { resetPassword } from './action'
import SubmitButton from '@/app/(loggedIn)/components/submitbutton'

const initialiState = undefined

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(resetPassword, initialiState)

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
        <SubmitButton going='Updating...' normal='Update password' />
      </form>
    </>
  )
}

export default ResetPasswordForm
