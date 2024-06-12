'use server'

import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

  if (validatedFields.data.id === 'fb706205-b512-4b3e-a232-e755013625fd') {
    return {
      status: 'error',
      message: 'You cannot delete the demo account',
    }
  }

  const supabase = createSupabaseClient()
  const { error: signOutError } = await supabase.auth.signOut()

  if (signOutError) {
    return {
      status: 'error',
      message: 'An error occurred while signing out',
    }
  }

  const supabaseToDel = createSupabaseClient('deleteAccount')

  const { error: deleteError } = await supabaseToDel.auth.admin.deleteUser(
    validatedFields.data.id
  )
  if (deleteError) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the user',
    }
  }

  return redirect('/login')
}

export const uploadProfilePicture = async (
  prevData: any,
  formData: FormData
) => {
  const user = await requireUser()
  const supabase = createSupabaseClient()

  const random = self.crypto.randomUUID()

  const { error } = await supabase.storage
    .from('profile_pictures')
    .upload(`${user.id}/${random}`, formData.get('profile_picture') as Blob)

  if (error) {
    console.log(error)
    return {
      status: 'error',
      message: error.message,
    }
  }

  const publicUrl = supabase.storage
    .from('profile_pictures')
    .getPublicUrl(`${user.id}/${random}`)

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      avatar: publicUrl.data?.publicUrl,
    })
    .eq('id', user.id)

  if (updateError) {
    console.log(updateError, 'updateError')
    return {
      status: 'error',
      message: 'An error occurred while updating the profile',
    }
  }

  revalidatePath('/profile')

  return {
    status: 'success',
    message: 'Avatar uploaded successfully',
  }
}
