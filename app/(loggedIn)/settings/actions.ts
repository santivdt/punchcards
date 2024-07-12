'use server'

import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  createOrganisationSchema,
  deleteSchema,
  updateOrganisationSchema,
  updateProfileSchema,
} from './schema'

export const getProfile = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase.from('profiles').select('*').eq('id', user.id).single()
}

export const updateProfile = async (prevData: any, formData: FormData) => {
  const validatedFields = updateProfileSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    id: formData.get('id'),
    avatar: formData.get('avatar'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()
  const user = await requireUser()

  const random = crypto.randomUUID()

  const { error: uploadError } = await supabase.storage
    .from('profile_pictures')
    .upload(`${user.id}/${random}`, validatedFields.data.avatar as Blob)

  if (uploadError) {
    return {
      status: 'error',
      message: uploadError.message,
    }
  }

  const { error: getProfileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (getProfileError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the profile',
    }
  }

  const avatarFromForm = formData.get('avatar') as File

  if (avatarFromForm.size === 0 && avatarFromForm.name === 'undefined') {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: validatedFields.data.first_name,
        last_name: validatedFields.data.last_name,
      })
      .eq('id', validatedFields.data.id)

    if (error) {
      return {
        status: 'error',
        message: 'An error occurred while updating the profile',
      }
    }
  } else {
    const publicUrl = supabase.storage
      .from('profile_pictures')
      .getPublicUrl(`${user.id}/${random}`)

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: validatedFields.data.first_name,
        last_name: validatedFields.data.last_name,
        avatar: publicUrl.data?.publicUrl,
      })
      .eq('id', validatedFields.data.id)

    if (error) {
      return {
        status: 'error',
        message: 'An error occurred while updating the profile',
      }
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

  return redirect('/')
}

export const updateOrganisation = async (prevData: any, formData: FormData) => {
  const validatedFields = updateOrganisationSchema.safeParse({
    id: formData.get('id'),
    logo: formData.get('logo'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  const logoFromForm = formData.get('logo') as File
  const didLogoChange =
    logoFromForm.size !== 0 && logoFromForm.name !== 'undefined'

  const supabase = createSupabaseClient()
  const user = await requireUser()

  if (!didLogoChange) {
    const { data, error } = await supabase
      .from('organisations')
      .update({
        name: validatedFields.data.name,
      })
      .eq('id', validatedFields.data.id)

    if (error) {
      return {
        status: 'error',
        message: 'An error occurred while updating the organisation',
      }
    }
  } else {
    const random = crypto.randomUUID()

    const { error: uploadError } = await supabase.storage
      .from('profile_pictures')
      .upload(`${user.id}/${random}`, validatedFields.data.logo as Blob)

    if (uploadError) {
      return {
        status: 'error',
        message: uploadError.message,
      }
    }

    const publicUrl = supabase.storage
      .from('profile_pictures')
      .getPublicUrl(`${user.id}/${random}`)

    const { error } = await supabase
      .from('organisations')
      .update({
        name: validatedFields.data.name,
        logo: publicUrl.data?.publicUrl,
      })
      .eq('id', validatedFields.data.id)

    if (error) {
      return {
        status: 'error',
        message: 'An error occurred while updating the organisation',
      }
    }
  }

  revalidatePath('/dashboard')

  return { status: 'success', message: 'Organisation updated successfully' }
}

export const createOrganisation = async (prevData: any, formData: FormData) => {
  const validatedFields = createOrganisationSchema.safeParse({
    logo: formData.get('logo'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()
  const user = await requireUser()
  const random = crypto.randomUUID()

  //TODO decide wether to change storage name or not
  const { error: uploadError } = await supabase.storage
    .from('profile_pictures')
    .upload(`${user.id}/${random}`, validatedFields.data.logo as Blob)

  if (uploadError) {
    console.log(uploadError)
    return {
      status: 'error',
      message: uploadError.message,
    }
  }

  const publicUrl = supabase.storage
    .from('profile_pictures')
    .getPublicUrl(`${user.id}/${random}`)

  const { error: createOrgError } = await supabase
    .from('organisations')
    .insert({
      name: validatedFields.data.name,
      owner: user.id,
      logo: publicUrl.data?.publicUrl,
    })

  if (createOrgError) {
    return {
      status: 'error',
      message: 'An error occurred while creating the organisation',
    }
  }

  revalidatePath('/dashboard')

  return { status: 'success', message: 'Organisation created successfully' }
}

export const getOrganisation = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('organisations')
    .select('*')
    .eq('owner', user.id)
    .single()
}
