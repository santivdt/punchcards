import Header from '@/components/header'
import InterMediateForgotForm from './intermediate-forgot-form'

const ForgotPasswordPage = () => {
  return (
    <div className='max-w-3xl mx-auto'>
      <Header title='Request password reset link' crumbs={false} />
      <p className='text-pretty mb-4'>
        Fill in your e-mail. If you have an account with us you will receive an
        e-mail to reset your password.
      </p>
      <InterMediateForgotForm />
    </div>
  )
}

export default ForgotPasswordPage
