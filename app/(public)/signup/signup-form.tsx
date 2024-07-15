'use client'

import { Input } from '@/components/ui/input'
import { SubmitButton } from '../login/submit-button'
import { Link } from 'nextjs13-progress'
import { useFormState } from 'react-dom'
import { signUp } from './actions'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

const SignupForm = () => {
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
            Sign Up
          </SubmitButton>
          <p className='text-xs'>
            By signing up you agree to our{' '}
            <Link href='/terms' className='underline underline-offset-2'>
              terms and conditions.
            </Link>
          </p>
          <p className='text-center'>or</p>
        </div>

        <div className='mt-4 text-center'>
          Already have an account?
          <Link href='/login' className='underline ml-2'>
            Sign in
          </Link>
        </div>
      </form>
    </>
  )
}

export default SignupForm
