'use client'

import FormError from '@/components/form-error'
import SubmitButton from '@/components/submitbutton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { forgotPassword } from './action'

const initialiState = undefined

const ForgotPasswordForm = () => {
  const [formState, formAction] = useFormState(forgotPassword, initialiState)
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')

  useEffect(() => {
    if (formState && formState.status === 'error') {
      setErrorMessage(formState.errors)
    } else if (
      formState &&
      formState.message &&
      formState.status === 'success'
    ) {
      toast.success(formState.message)
    }
  }, [formState])

  return (
    <>
      <form action={formAction} className='w-[300px]'>
        <Label htmlFor='password'>E-mail</Label>
        <Input type='text' id='email' name='email' required className='mb-4' />
        <SubmitButton going='Requesting...' normal='Request link' />
        <FormError errorMessage={errorMessage} />
      </form>
    </>
  )
}

export default ForgotPasswordForm
