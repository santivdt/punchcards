'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'

export const getHoursFromUser = async () => {
  const supabase = createSupabaseClient()
  return supabase
    .from('hours')
    .select(
      `id, created_at, description, duration, client_id, card_id, user_id,
      clients(id, name),
      cards(id, readable_id)`
    )
    .order('created_at', { ascending: false })
}

export const createHour = async (prevData: any, formData: FormData) => {
  const validatedFields = createSchema.safeParse({
    description: formData.get('description'),
    duration: Number(formData.get('duration')),
    card_id: formData.get('card_id'),
    date: formData.get('date'),
  })

  if (validatedFields.error) {
    console.log(validatedFields.error, 'Error')
  }

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
    .select('*')
    .eq('id', validatedFields.data.card_id)
    .single()

  if (cardError) {
    return {
      status: 'error',
      message: 'Could not fetch card information',
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
    client_id: card.client_id,
    duration: durationNumber,
    card_id: validatedFields.data.card_id,
    created_at: validatedFields.data.date,
  })

  if (hourError) {
    return {
      status: 'error',
      message: 'An error occurred while creating the hour',
    }
  }

  const { error: cardUpdateError } = await supabase
    .from('cards')
    .update({ hours_left: card.hours_left - durationNumber })
    .eq('id', validatedFields.data.card_id)

  if (cardUpdateError) {
    return {
      status: 'error',
      message: 'An error occurred while updating hours on the card',
    }
  }

  if (card.hours_left === durationNumber) {
    await supabase
      .from('cards')
      .update({ is_active: false })
      .eq('id', validatedFields.data.card_id)
  }

  revalidatePath('/hours')
  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Hour created successfully',
  }
}

export const deleteHour = async (prevData: any, formData: FormData) => {
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

  const dummyDataHours = [
    'be689607-3fb8-4153-a613-456b7606b4ed',
    'e6f47601-34bc-4e84-a1e0-ee9cbd4f4131',
    '495030a6-a189-4a52-bc57-8f66be38aef4',
  ]

  if (dummyDataHours.includes(validatedFields.data.hourId)) {
    return {
      status: 'error',
      message:
        'Cannot delete dummy data hours. Add your own hours to delete them.',
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

export const deleteHours = async (prevData: any, formData: FormData) => {
  const data: Tables<'hours'>[] = JSON.parse(formData.get('data') as string)

  const ids = data.map((obj) => obj.id)

  const dummyDataHours = [
    'be689607-3fb8-4153-a613-456b7606b4ed',
    'e6f47601-34bc-4e84-a1e0-ee9cbd4f4131',
    '495030a6-a189-4a52-bc57-8f66be38aef4',
  ]

  if (ids.some((id) => dummyDataHours.includes(id))) {
    return {
      status: 'error',
      message:
        'Cannot delete dummy data hours. Add your own hours to delete them.',
    }
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase.from('hours').delete().in('id', ids)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while deleting the hours',
    }
  }

  data.forEach(async (hour) => {
    const { data: card, error: getCardInfoError } = await supabase
      .from('cards')
      .select('hours_left, ends_at')
      .eq('id', hour.card_id)
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
        hours_left: card.hours_left + hour.duration,
        is_active: cardShouldBeActivated,
      })
      .eq('id', hour.card_id)

    if (updateCardError) {
      return {
        status: 'error',
        message: 'An error occurred while updating the card',
      }
    }
  })

  revalidatePath('/hours')
  revalidatePath('/cards')

  return { status: 'success', message: 'Hours deleted successfully' }
}

export const updateHour = async (prevData: any, formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
    description: formData.get('description'),
    duration: Number(formData.get('duration')),
    hourId: formData.get('hourId'),
    date: formData.get('date'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const dummyDataHours = [
    'be689607-3fb8-4153-a613-456b7606b4ed',
    'e6f47601-34bc-4e84-a1e0-ee9cbd4f4131',
    '495030a6-a189-4a52-bc57-8f66be38aef4',
  ]

  if (dummyDataHours.includes(validatedFields.data.hourId)) {
    return {
      status: 'error',
      message:
        'Cannot update dummy data hours. Add your own hours to update them.',
    }
  }

  const supabase = createSupabaseClient()

  const user = await requireUser()

  const { error } = await supabase
    .from('hours')
    .update({
      description: validatedFields.data.description,
      duration: validatedFields.data.duration,
      created_at: validatedFields.data.date,
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

export const getHoursFromClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('hours')
    .select(`*, clients (id, name)`)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
}

export const getHoursFromCard = async (cardId: Tables<'cards'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('hours')
    .select(
      `*, 
      clients (id, name),
      cards(readable_id)`
    )
    .order('created_at', { ascending: false })
    .eq('card_id', cardId)
}
