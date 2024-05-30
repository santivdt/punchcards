import PromoText from '@/app/login/promo-text'
import { SubmitButton } from '@/app/login/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signUp } from './actions'

export default function Signup() {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Sign up</h1>
            <p>Enter your credentials below to sign up </p>
          </div>
          <form className='flex flex-col justify-center gap-2 text-foreground'>
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
        </div>
      </div>
      <div className=' bg-black lg:h-screen flex flex-col justify-center py-12 px-8 lg:px-32 text-white leading-relaxed'>
        <PromoText />
      </div>
    </div>
  )
}
