'use server'

import { deleteSchema, updateProfileSchema } from './schema'
import { createCardTypeSchema } from './schema'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { requireUser } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { Tables } from '@/types/supabase'

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

  const { data, error } = await supabase
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

export const getCardTypes = async () => {
  const supabase = createSupabaseClient()

  return supabase.from('card_types').select('*')
}

export const createCardType = async (prevData: any, formData: FormData) => {
  const validatedFields = createCardTypeSchema.safeParse({
    hours: Number(formData.get('hours')),
    price: Number(formData.get('price')),
  })

  if (!validatedFields.success) {
    console.log(validatedFields)
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const user = await requireUser()

  const { error } = await supabase.from('card_types').insert({
    user_id: user.id,
    hours: validatedFields.data.hours,
    price: validatedFields.data.price,
  })

  if (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'An error occurred while creating the client',
    }
  }

  revalidatePath('/u/profile')

  return {
    status: 'success',
    message: 'Client created successfully',
  }
}

export const deleteCardType = async (prevData: any, formData: FormData) => {
  const validatedFields = deleteSchema.safeParse({
    id: formData.get('cardTypeId'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const supabase = createSupabaseClient()

  const { error } = await supabase
    .from('card_types')
    .delete()
    .eq('id', validatedFields.data.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the card type',
    }
  }

  revalidatePath('/profile')

  return {
    status: 'success',
    message: 'Card type deleted successfully',
  }
}
