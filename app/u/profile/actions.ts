'use server'

import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { deleteSchema, updateProfileSchema } from './schema'

export const getProfile = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase.from('profiles').select('*').eq('id', user.id).single()
}

export const updateProfile = async (prevData: any, formData: FormData) => {
  const validatedFields = updateProfileSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    company: formData.get('company'),
    id: formData.get('id'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: validatedFields.data.first_name,
      last_name: validatedFields.data.last_name,
      company: validatedFields.data.company,
    })
    .eq('id', validatedFields.data.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while updating the profile',
    }
  }
  revalidatePath('/profile')
  revalidatePath('/')

  return {
    status: 'success',
    message: 'Profile updated successfully',
  }
}

export const deleteUser = async (prevData: any, formData: FormData) => {
  const validatedFields = deleteSchema.safeParse({
    id: formData.get('id'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields)
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const supabase = createSupabaseClient()
  const { error } = await supabase.auth.admin.deleteUser(
    validatedFields.data.id
  )

  if (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the user',
    }
  }
  revalidatePath('/u/profile')

  return {
    status: 'success',
    message: 'User deleted successfully',
  }
}
