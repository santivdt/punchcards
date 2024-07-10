'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { resetPasswordSchema } from './schema'
import { redirect } from 'next/navigation'

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

  redirect('/login/?message=Your password has been reset. Please log in.')
}
