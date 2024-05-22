import { signIn, signUp } from '@/app/login/actions'
import { SubmitButton } from './submit-button'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <form className='flex flex-col justify-center flex-1 w-full gap-2 text-foreground'>
      <label className='text-md' htmlFor='email'>
        Email
      </label>
      <input
        className='px-4 py-2 mb-6 border rounded-md bg-inherit'
        name='email'
        placeholder='you@example.com'
        required
      />
      <label className='text-md' htmlFor='password'>
        Password
      </label>
      <input
        className='px-4 py-2 mb-6 border rounded-md bg-inherit'
        type='password'
        name='password'
        placeholder='••••••••'
        required
      />
      <SubmitButton
        formAction={signIn}
        className='px-4 py-2 mb-2 bg-green-700 rounded-md text-foreground'
        pendingText='Signing In...'
      >
        Sign In
      </SubmitButton>
      <SubmitButton
        formAction={signUp}
        className='px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground'
        pendingText='Signing Up...'
      >
        Sign Up
      </SubmitButton>
      {searchParams?.message && (
        <p className='p-4 mt-4 text-center bg-foreground/10 text-foreground'>
          {searchParams.message}
        </p>
      )}
    </form>
  )
}
