import { SubmitButton } from '../login/submit-button'
import { signupWithGoogle } from '../signup/actions'

const SignupWithGoogle = ({ children }: { children: React.ReactNode }) => {
  return (
    <form className='flex flex-col justify-center gap-2 w-[300px] mt-4'>
      <div className='grid gap-4'>
        <SubmitButton
          formAction={signupWithGoogle}
          className='px-4 py-2 mb-2 bg-black text-white border rounded-md'
        >
          {children}
        </SubmitButton>
      </div>
    </form>
  )
}

export default SignupWithGoogle
