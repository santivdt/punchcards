import Header from '@/components/header'
import InterMediateForgotForm from './intermediate-forgot-form'

const ForgotPasswordPage = () => {
  return (
    <>
      <Header title='Request password reset link' crumbs={false} />
      <p className='text-pretty mb-4'>
        Fill in your e-mail. If you have an account with us you will receive an
        e-mail to reset your password.
      </p>
      <InterMediateForgotForm />
    </>
  )
}

export default ForgotPasswordPage
