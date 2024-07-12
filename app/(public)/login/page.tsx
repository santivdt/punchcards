import DemoButton from '@/app/(public)/components/demo-button'
import { signIn } from '@/app/(public)/login/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SubmitButton } from './submit-button'

const Login = async ({
  searchParams,
}: {
  searchParams: { message: string }
}) => {
  const RenderMessage = () => {
    switch (searchParams?.message) {
      case 'Could not authenticate user':
        return (
          <p className='text-center bg-red-200 p-2 mt-4 text-red-700 mb-8 w-[300px]'>
            {searchParams.message}
          </p>
        )
      case 'Check your email to confirm your email address. You can sign in afterwards':
        return (
          <p className='text-center bg-green-200 p-2 mt-4 text-green-700 mb-8 w-[300px]'>
            {searchParams.message}.
          </p>
        )
      default:
        return null
    }
  }
  return (
    <div className='flex justify-center items-center flex-col '>
      <div>
        <h1 className='text-2xl font-bold'>Log in to Punch it!</h1>
        {searchParams?.message ? (
          <>
            <RenderMessage />
          </>
        ) : (
          <>
            <p className='mt-2'>Enter your credentials below to login</p>
          </>
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
              formAction={signIn}
              className='px-4 py-2 mb-2 bg-black text-white border rounded-md '
              pendingText='Signing In...'
            >
              Sign in
            </SubmitButton>

            <DemoButton />
          </div>

          <div className='mt-4 text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='underline ml-2'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
