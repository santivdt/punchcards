import DemoButton from '@/app/(website)/components/demo-button'
import { signIn } from '@/app/(website)/login/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { SubmitButton } from './submit-button'
import SignupWithGoogle from '../components/signup-with-oauth'
import SignupWithOAuthButton from '../components/signup-with-oauth'

const Login = ({ searchParams }: { searchParams: { message: string } }) => {
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
        {/* <h1 className='text-2xl font-bold'>Log in to Punchy</h1> */}
        {/* {searchParams?.message ? (
          <>
            <RenderMessage />
          </>
        ) : (
          <>
            <p className='mt-2'>Enter your credentials below to login </p>
          </>
        )} */}
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
              className='px-4 py-2 mb-2 bg-black text-white border rounded-md'
              pendingText='Signing In...'
            >
              Log in
            </SubmitButton>
            <p className='text-center mb-2'>or</p>
          </div>
        </form>
        <SignupWithOAuthButton provider='google'>
          Log in with Google
        </SignupWithOAuthButton>
        <SignupWithOAuthButton provider='github'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
          Log in with Github
        </SignupWithOAuthButton>
        <div className='mt-4 text-center'>
          Don&apos;t have an account?
          <Link href='/signup' className='underline ml-2'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
