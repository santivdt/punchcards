'use client'

import SubmitButton from '@/components/submitbutton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { getSessionWithTokens, resetPassword } from './action'

const initialiState = undefined

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(resetPassword, initialiState)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      setAccessToken(hashParams.get('access_token') || '')
      setRefreshToken(hashParams.get('refresh_token') || '')
    }
  }, [])

  useEffect(() => {
    if (accessToken && refreshToken) {
      getSessionWithTokens(accessToken, refreshToken)
    }
  }, [accessToken, refreshToken])

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
