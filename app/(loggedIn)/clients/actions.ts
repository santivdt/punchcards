'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { getErrorMessage } from '@/utils/server-utils'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'

const dummyDataClients = [
  'cc4620b7-9aae-455b-b7f1-79bbd404d5ba',
  'a6f0d3b0-d9d6-47c3-9dbc-d3a777842cae',
  '8fc5cbf6-90bc-41a7-9faf-fb93467781fe',
  '088d040d-698f-479f-87c9-86a26b18de0d',
  '498a65d6-e01d-416e-bfbf-f09dc94db0aa',
  '42aea556-5fab-411b-b78d-3bfbc387ee29',
]

export const getClientsFromUser = async () => {
  requireUser()
  const supabase = createSupabaseClient()
  return await supabase
    .from('clients')
    .select(`name, email, created_at, user_id, id`)
    .order('created_at', { ascending: false })
}

export const getClientsFromUserNew = async () => {
  try {
    requireUser()
    // TODO is this really better, and if there is an error where / how would it be displayed?
    //TODO had to remove the try catch because then my promise all wasnt working anymore

    const supabase = createSupabaseClient()

    return await supabase
      .from('clients')
      .select(`name, email, created_at, user_id, id`)
      .order('created_at', { ascending: false })
  } catch (error) {
    getErrorMessage(error)
  }
}

export const createClient = async (prevData: any, formData: FormData) => {
  requireUser()
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
  const user = await requireUser()

  const { data: currentClients } = await supabase
    .from('clients')
    .select(`email`)

  if (
    currentClients != null &&
    currentClients.some((item) => item.email === validatedFields.data.email)
  ) {
    return {
      status: 'error',
      message: 'Client with this e-mail already exists',
    }
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

export const updateClient = async (prevData: any, formData: FormData) => {
  //TODO is this the same ?
  requireUser()
  const user = await requireUser()

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

  if (dummyDataClients.includes(validatedFields.data.clientId)) {
    return {
      status: 'error',
      message:
        'Cannot update dummy clients. If you add your own client you can update them.',
    }
  }

  const supabase = createSupabaseClient()

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

export const deleteClient = async (prevData: any, formData: FormData) => {
  const user = await requireUser()
  const validatedFields = deleteSchema.safeParse({
    clientId: formData.get('clientId'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  if (dummyDataClients.includes(validatedFields.data.clientId)) {
    return {
      status: 'error',
      message:
        'Cannot delete dummy clients. If you add your own client you can delete them.',
    }
  }

  const supabase = createSupabaseClient()

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

export const getClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('clients')
    .select(`name, email`)
    .eq('id', clientId)
    .eq('user_id', user.id)
    .single()
}

export const getClientFromId = async (id: string) => {
  requireUser()
  const supabase = createSupabaseClient()

  return supabase
    .from('clients')
    .select(`id, name, email`)
    .eq('id', id)
    .single()
}

export const checkEmail = async (email: string) => {
  requireUser
  const supabase = createSupabaseClient()

  const { data: currentClients } = await supabase
    .from('clients')
    .select(`email`)

  if (
    currentClients != null &&
    currentClients.some((item) => item.email === email)
  ) {
    return {
      status: 'error',
      message: 'Client with this e-mail already exists',
    }
  }

  return { status: 'success' }
}
