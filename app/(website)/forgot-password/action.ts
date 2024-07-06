'use server'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { forgotSchema } from './schema'

export const forgotPassword = async (prevData: any, formData: FormData) => {
  const validatedFields = forgotSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: 'Invalid email',
    }
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    validatedFields.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    }
  )

  if (error) {
    return {
      status: 'error',
      errors: error.message,
    }
  }

  return {
    status: 'success',
    message: 'Password reset link sent',
  }
}
