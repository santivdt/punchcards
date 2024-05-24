'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSchema, deleteSchema, updateSchema } from './schema'
import { requireUser } from '@/utils/auth'

export const getClientsFromUser = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()
  //TODO Giel hier checken we dus niet eerst of de user is ingelogd klopt dat of vergeten?
  return supabase
    .from('clients')
    .select(`id, name, email, user_id`)
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
}

export const createClient = async (prevState: any, formData: FormData) => {
  const validatedFields = createSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { error } = await supabase.from('clients').insert({
    user_id: user.id,
    name: validatedFields.data.name,
    email: validatedFields.data.email,
  })

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while creating the client',
    }
  }

  revalidatePath('/clients')

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

  const { error } = await supabase
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
    message: 'Client updated successfully',
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

  const { error } = await supabase
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
