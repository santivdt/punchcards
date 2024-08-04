'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import LastUsed from '../components/last-used'
import { SubmitButton } from '../login/submit-button'
import { signUp } from './actions'

const SignupForm = ({
  lastSignedInMethod,
}: {
  lastSignedInMethod: string | undefined
}) => {
  const [status, formAction] = useFormState(signUp, null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    if (status && status.status === 'error') {
      setErrorMessage(status.message)
    }
  }, [status])

  return (
    <>
      {errorMessage && (
        <p className='text-red-700 mt-2 bg-red-200 p-3'>{errorMessage}</p>
      )}
      <form
        className='flex flex-col justify-center gap-2 w-[300px] mt-4'
        action={formAction}
      >
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label className='text-md' htmlFor='email'>
              Email
            </Label>
            <Input
              className='px-4 py-2 mb-6 border rounded-md bg-inherit'
              name='email'
              placeholder='you@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label className='text-md' htmlFor='password'>
              Password
            </Label>
            <Input
              className='px-4 py-2 mb-6 border rounded-md bg-inherit'
              type='password'
              name='password'
              required
            />
          </div>
          <SubmitButton
            className='px-4 py-2 mb-2 bg-black text-white border rounded-md hover:scale-105'
            pendingText='Signing you up...'
          >
            <div className='relative'>
              Sign Up
              {lastSignedInMethod === 'email' && <LastUsed />}
            </div>
          </SubmitButton>
        </div>
      </form>
    </>
  )
}

export default SignupForm
