import Header from '@/components/header'
import ResetPasswordForm from './reset-form'

const ResetPassword = async () => {
  return (
    <div className='max-w-3xl mx-auto'>
      <Header title='Reset password' crumbs={false} />
      <ResetPasswordForm />
    </div>
  )
}

export default ResetPassword
