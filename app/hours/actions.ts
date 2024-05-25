'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'
import { requireUser } from '@/utils/auth'

export const getHoursFromUser = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()
  return supabase
    .from('hours')
    .select(
      `id, created_at,description, duration, client_id, card_id,
      clients:client_id(id, name),
      cards:card_id(id, readable_id)`
    )
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
}

export const createHour = async (formData: FormData) => {
  const validatedFields = createSchema.safeParse({
    description: formData.get('description'),
    duration: Number(formData.get('duration')),
    client_id: formData.get('client_id'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const user = await requireUser()

  const { data: card, error: cardError } = await supabase
    .from('cards')
    .select('id, hours_left')
    .eq('client_id', validatedFields.data.client_id)
    .eq('is_active', true)
    .single()

  if (cardError) {
    return {
      status: 'error',
      message: 'No active card found for this client',
    }
  }
  const durationNumber = Number(validatedFields.data.duration)

  if (durationNumber > card.hours_left) {
    return {
      status: 'error',
      message: `There are not engough hours left in the card to create this task. Hours left: ${card.hours_left}`,
    }
  }

  const { error: hourError } = await supabase.from('hours').insert({
    user_id: user.id,
    description: validatedFields.data.description,
    client_id: validatedFields.data.client_id,
    duration: durationNumber,
    card_id: card.id,
  })

  if (hourError) {
    console.log(hourError, 'hourError')
    return {
      status: 'error',
      message: 'An error occurred while creating the hour',
    }
  }

  const { error: cardUpdateError } = await supabase
    .from('cards')
    .update({ hours_left: card.hours_left - durationNumber })
    .eq('id', card.id)

  if (cardUpdateError) {
    console.log(cardUpdateError, 'cardUpdateError')
    return {
      status: 'error',
      message: 'An error occurred while updating hours on the card',
    }
  }

  if (card.hours_left === durationNumber) {
    await supabase.from('cards').update({ is_active: false }).eq('id', card.id)
  }

  revalidatePath('/hours')
  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Hour created successfully',
  }
}

export const deleteHour = async (formData: FormData) => {
  const validatedFields = deleteSchema.safeParse({
    hourId: formData.get('hourId'),
    duration: Number(formData.get('duration')),
    cardId: formData.get('cardId'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()
  const user = await requireUser()

  const { error: deleteError } = await supabase
    .from('hours')
    .delete()
    .eq('id', validatedFields.data.hourId)
    .eq('user_id', user.id)

  if (deleteError) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the hour',
    }
  }

  const { data: card, error: getCardInfoError } = await supabase
    .from('cards')
    .select('hours_left, ends_at')
    .eq('id', validatedFields.data.cardId)
    .eq('user_id', user.id)
    .single()

  if (getCardInfoError) {
    return {
      status: 'error',
      message: 'An error occurred while getting hours_left',
    }
  }

  const cardShouldBeActivated = new Date() < new Date(card.ends_at)

  const { error: updateCardError } = await supabase
    .from('cards')
    .update({
      hours_left: card.hours_left + validatedFields.data.duration,
      is_active: cardShouldBeActivated,
    })
    .eq('id', validatedFields.data.cardId)
    .eq('user_id', user.id)

  if (updateCardError) {
    return {
      status: 'error',
      message: 'An error occurred while updating the card',
    }
  }

  revalidatePath('/hours')
  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Hour deleted successfully',
  }
}

export const updateHour = async (formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
    description: formData.get('description'),
    duration: Number(formData.get('duration')),
    hourId: formData.get('hourId'),
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
    .from('hours')
    .update({
      description: validatedFields.data.description,
      duration: validatedFields.data.duration,
    })
    .eq('id', validatedFields.data.hourId)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while updating the task',
    }
  }

  revalidatePath('/hours')

  return {
    status: 'success',
    message: 'Task updated successfully',
  }
}
