import { signIn } from '@/app/login/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import PromoText from './promo-text'
import { SubmitButton } from './submit-button'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>

            {searchParams?.message ? (
              <p className=' mt-4 text-green-700'>{searchParams.message}</p>
            ) : (
              <p className='mt-4'>Enter your credentials below to login </p>
            )}
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
                formAction={signIn}
                className='px-4 py-2 mb-2 bg-black text-white border rounded-md '
                pendingText='Signing In...'
              >
                Sign In
              </SubmitButton>
            </div>

            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?
              <Link href='/signup' className='underline ml-2'>
                Sign up
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
