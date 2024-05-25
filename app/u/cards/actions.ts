'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { createSchema, deleteSchema, updateSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { requireUser } from '@/utils/auth'

export const getCardsFromUser = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()
  return supabase
    .from('cards')
    .select(
      `created_at, ends_at, hours, hours_left, readable_id, id, is_active, 
      clients:client_id(id, name)`
    )
    .limit(10)
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
}

export const createCard = async (prevData: any, formData: FormData) => {
  let dateOneYearFromNow = new Date()
  dateOneYearFromNow.setFullYear(dateOneYearFromNow.getFullYear() + 1)
  const endsAtString = dateOneYearFromNow.toISOString()

  const hoursNumber = Number(formData.get('hours'))

  const validatedFields = createSchema.safeParse({
    client_id: formData.get('client_id'),
    hours: hoursNumber,
    hours_left: hoursNumber,
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const user = await requireUser()
  // TODO really no idea how to get the price of the card that was picked

  let price = 0
  if (hoursNumber == 10) {
    price = 950
  } else if (hoursNumber == 20) {
    price = 1800
  } else {
    price = 2250
  }

  const { error } = await supabase.from('cards').insert({
    user_id: user.id,
    client_id: validatedFields.data.client_id,
    hours: validatedFields.data.hours,
    ends_at: endsAtString,
    hours_left: validatedFields.data.hours_left,
    is_active: true,
    price: price,
  })

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while creating the client',
    }
  }

  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Client created successfully',
  }
}

export const deleteCard = async (prevData: any, formData: FormData) => {
  const validatedFields = deleteSchema.safeParse({
    card_id: formData.get('cardId'),
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
    .from('cards')
    .delete()
    .eq('id', validatedFields.data.card_id)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the card',
    }
  }

  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Card deleted successfully',
  }
}

export const updateCard = async (prevData: any, formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
    hours: Number(formData.get('hours')),
    hours_left: Number(formData.get('hours_left')),
    card_id: formData.get('card_id'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log(validatedFields.data, 'is it')

  const supabase = createSupabaseClient()

  const user = await requireUser()

  const { error } = await supabase
    .from('cards')
    .update({
      hours: validatedFields.data.hours,
      hours_left: validatedFields.data.hours_left,
    })
    .eq('id', validatedFields.data.card_id)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while updating the card',
    }
  }

  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Card updated successfully',
  }
}
