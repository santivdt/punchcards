'use server'

import { updateSchema } from './schema'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { revalidatePath } from 'next/cache'

export const getProfile = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase.from('users').select('*').eq('id', userId)
}

export const updateProfile = async (prevState: any, formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
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

  const user = await requireUser()

  const { data, error } = await supabase
    .from('users')
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
