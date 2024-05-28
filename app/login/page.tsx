import { signIn, signUp } from '@/app/login/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitButton } from './submit-button'
import { Linkedin, LucideGlobe } from 'lucide-react'
import Link from 'next/link'

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
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
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
                  placeholder='••••••••'
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
            <SubmitButton
              formAction={signUp}
              className='px-4 py-2 mb-2 border rounded-md bg-white text-black border-black'
              pendingText='Signing Up...'
            >
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <p className='p-4 mt-4 text-center'>{searchParams.message}</p>
            )}

            {/* <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?
              <Link href='#' className='underline'>
                Sign up
              </Link>
            </div> */}
          </form>
        </div>
      </div>
      <div className=' bg-black h-screen flex flex-col justify-center py-12 px-32 '>
        <h1 className='text-white text-lg font-bold mb-4'>
          Prepaid hours app by Santi van den Toorn
        </h1>
        <p className='text-white mb-4'>
          Hi there, welcome to my little app to manage prepaid hours for
          freelancers. I built this cause I needed it myself and because I
          needed a portfolio project to apply for jobs as a front-end developer.
        </p>
        <p className='text-white mb-4'>
          The stack I used is NextJS, Typescript, Tailwind, ShadCN ui and
          Supabase. You can signup or login with the demo credentials.
          <span className='ml-2 text-purple-300'>
            demo@demo.email, demopassword
          </span>
        </p>
        <p className='text-white mb-4'>
          I am not a designer so the UI/UX is definitey not optimal but it
          should work.
        </p>
        <p className='text-white mb-4'>
          I am looking for a job as a front-end developer where I can work and
          learn in a team. I have extensive experience in tech as a project
          manager, product owner, consultant and front-end dev.
        </p>
        <p className='text-white mb-4'>
          The perfect place would be:
          <ul className='list-disc'>
            <li>Fully remote or at least hybrid ( I am Amsterdam based)</li>
            <li>Max 32 hours but preferably 24</li>
            <li>Freelance or contract both fine</li>
          </ul>
        </p>
        <p className='flex flex-row mt-4'>
          <a
            href='https://www.linkedin.com/in/santi-van-den-toorn-99378020/'
            target='_blank'
          >
            <Linkedin className='text-white mr-2' size={18} />
          </a>

          <a href='https://santi.tech' target='_blank'>
            <LucideGlobe className='text-white' size={18} />
          </a>
        </p>
      </div>
    </div>
  )
}
