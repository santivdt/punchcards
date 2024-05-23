'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSchema, deleteSchema, updateSchema } from './schema'
import { requireUser } from '@/utils/auth'

export const getClientsFromUser = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('clients')
    .select(`id, name, email, user_id`)
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
}

export const createClient = async (prevState: any, formData: FormData) => {
  // Validate the form data
  const validatedFields = createSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Create the server client
  const supabase = createSupabaseClient()

  // Get logged in user from database
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // if user is not logged in, redirect to login page
    return redirect('/login')
  }

  // User is logged in and has permission to create clients, so let do that
  const { data, error } = await supabase.from('clients').insert({
    user_id: user.id,
    name: validatedFields.data.name,
    email: validatedFields.data.email,
  })

  // If there is an error, return an error message
  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while creating the client',
    }
  }

  // If the client was created successfully, revalidate the clients page
  revalidatePath('/clients')

  // Return a success message
  return {
    status: 'success',
    message: 'Client created successfully',
  }
}

export const updateClient = async (prevState: any, formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    clientId: formData.get('clientId'),
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
    .from('clients')
    .update({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
    })
    .eq('id', validatedFields.data.clientId)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while updating the client',
    }
  }

  revalidatePath('/clients')

  return {
    status: 'success',
    message: 'Client created successfully',
  }
}

export const deleteClient = async (prevState: any, formData: FormData) => {
  const validatedFields = deleteSchema.safeParse({
    clientId: formData.get('clientId'),
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
    .from('clients')
    .delete()
    .eq('id', validatedFields.data.clientId)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the client',
    }
  }

  revalidatePath('/clients')

  return {
    status: 'success',
    message: 'Client deleted successfully',
  }
}
