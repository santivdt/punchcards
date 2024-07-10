'use client'
import { SignupWithOAuth } from '@/app/[locale]/(website)/signup/actions'

const SignupWithOAuthButton = ({
  children,
  provider,
}: {
  children: React.ReactNode
  provider: 'google' | 'github'
}) => {
  return (
    <div className='flex flex-col justify-center gap-2 w-[300px]'>
      <button
        onClick={() => SignupWithOAuth(provider)}
        className='px-4 py-2 mb-2 bg-black text-white border rounded-md flex justify-center items-center gap-2 hover:scale-105'
      >
        {children}
      </button>
    </div>
  )
}

export default SignupWithOAuthButton
