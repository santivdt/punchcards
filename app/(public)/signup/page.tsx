import { SiGithub, SiGoogle } from '@icons-pack/react-simple-icons'
import { cookies } from 'next/headers'
import { Link } from 'nextjs13-progress'
import LastUsed from '../components/last-used'
import SignupWithOAuthButton from '../components/signup-with-oauth'
import SignupForm from './signup-form'

const Signup = ({ searchParams }: { searchParams: { message: string } }) => {
  const cookieJar = cookies()
  const lastSignedInMethod: string | undefined =
    cookieJar.get('lastSignedInMethod')?.value

  return (
    <div className='flex justify-center flex-col items-center'>
      <div>
        <h1 className='text-2xl font-bold text-center'>Sign up to Punch it!</h1>
        {searchParams?.message && (
          <p className='text-center bg-red-200 p-2 mt-4 text-red-700 mb-8 w-[300px]'>
            {searchParams.message}
          </p>
        )}
        <SignupForm lastSignedInMethod={lastSignedInMethod} />
        <p className='text-center my-4'>or</p>
        <SignupWithOAuthButton provider='google'>
          <SiGoogle size={14} /> Sign Up with Google
          {lastSignedInMethod === 'google' && <LastUsed />}
        </SignupWithOAuthButton>

        <SignupWithOAuthButton provider='github'>
          <SiGithub size={14} />
          Sign Up with Github
          {lastSignedInMethod === 'github' && <LastUsed />}
        </SignupWithOAuthButton>
      </div>
      <p className='text-xs'>
        By signing up you agree to our{' '}
        <Link href='/terms' className='underline underline-offset-2'>
          terms and conditions.
        </Link>
      </p>
      <div className='mt-4 text-center'>
        Already have an account?
        <Link href='/login' className='underline ml-2'>
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default Signup
