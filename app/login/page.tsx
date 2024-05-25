import { signIn, signUp } from '@/app/login/actions'
import Header from '@/components/header'
import { SubmitButton } from './submit-button'

const Login = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <>
      <Header title='Login' />
      <form className='flex flex-col justify-center w-1/2 gap-2 text-foreground'>
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
          className='px-4 py-2 mb-2 border-black border rounded-md '
          pendingText='Signing In...'
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className='px-4 py-2 mb-2 border rounded-md bg-black text-white'
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className='p-4 mt-4 text-center bg-foreground/10'>
            {searchParams.message}
          </p>
        )}
      </form>
    </>
  )
}

export default Login
