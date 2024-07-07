'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { resetPasswordSchema } from './schema'

export const resetPassword = async (prevData: any, formData: FormData) => {
  const validatedFields = resetPasswordSchema.safeParse({
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const supabase = createSupabaseClient()

  const { error } = await supabase.auth.updateUser({
    password: validatedFields.data.password,
  })

  if (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'An error occurred while resetting your password',
    }
  }

  console.log('Password reset successfully')

  return {
    status: 'success',
    message: 'Password reset successfully',
  }
}
