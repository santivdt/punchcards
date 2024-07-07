import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SubmitButton } from '../login/submit-button'
import { signUp, signupWithGoogle } from './actions'
import { Button } from '@/components/ui/button'

const Signup = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <div className='flex justify-center flex-col items-center'>
      <div>
        <h1 className='text-2xl font-bold'>Sign up to Punchy</h1>
        {searchParams?.message && (
          <p className='text-center bg-red-200 p-2 mt-4 text-red-700 mb-8 w-[300px]'>
            {searchParams.message}
          </p>
        )}
        <form className='flex flex-col justify-center gap-2 w-[300px] mt-4'>
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
              formAction={signUp}
              className='px-4 py-2 mb-2 bg-black text-white border rounded-md '
              pendingText='Signing you up...'
            >
              Sign Up
            </SubmitButton>
          </div>

          <div className='mt-4 text-center'>
            Already have an account?
            <Link href='/login' className='underline ml-2'>
              Sign in
            </Link>
          </div>
        </form>
        <form className='flex flex-col justify-center gap-2 w-[300px] mt-4'>
          <div className='grid gap-4'>
            <SubmitButton
              formAction={signupWithGoogle}
              className='px-4 py-2 mb-2 bg-black text-white border rounded-md'
            >
              Sign up with Google
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
