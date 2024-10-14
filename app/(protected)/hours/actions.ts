'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'

const dummyDataHours = [
  '4724f5f5-ea95-4272-8728-23052d5e68aa',
  '7911d999-3a9c-4e92-a5a7-47048a3ddf47',
  '7b309bf2-f478-4399-afe1-9b7bbe24d8f5',
  '891a6fa9-ed9d-4de3-8b6f-2551fe374a53',
]

export const getHoursFromUser = async () => {
  const supabase = createSupabaseClient()
  return supabase
    .from('hours')
    .select(`*, clients(id, name), cards(id, readable_id)`)
    .order('date', { ascending: false })
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
      message: `There are not enough hours left in the card to create this task. Hours left: ${card.hours_left}`,
    }
  }

  const { error: hourError } = await supabase.from('hours').insert({
    user_id: user.id,
    description: validatedFields.data.description,
    client_id: card.client_id,
    duration: durationNumber,
    card_id: validatedFields.data.card_id,
    date: validatedFields.data.date,
  })

  if (hourError) {
    return {
      status: 'error',
      message: 'An error occurred while creating the hour',
    }
  }

  const currentDate = new Date().toISOString().slice(0, 10)

  const { error: cardUpdateError } = await supabase
    .from('cards')
    .update({
      hours_left: card.hours_left - durationNumber,
      last_updated: currentDate,
    })
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

// TODO i make 1000 database calls in this function, think it could be done better
export const updateHour = async (prevData: any, formData: FormData) => {
  const validatedFields = updateSchema.safeParse({
    description: formData.get('description'),
    duration: Number(formData.get('duration')),
    hourId: formData.get('hourId'),
    date: formData.get('date'),
    cardId: formData.get('cardId'),
    oldDuration: Number(formData.get('oldDuration')),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

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
      date: validatedFields.data.date,
    })
    .eq('id', validatedFields.data.hourId)
    .eq('user_id', user.id)

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while updating the task',
    }
  }

  const { data: card, error: getCardInfoError } = await supabase
    .from('cards')
    .select('hours_left')
    .eq('id', validatedFields.data.cardId)
    .single()

  if (getCardInfoError) {
    return {
      status: 'error',
      message: 'An error occurred while getting hours_left',
    }
  }

  if (validatedFields.data.oldDuration !== validatedFields.data.duration) {
    const difference =
      validatedFields.data.oldDuration - validatedFields.data.duration

    const { error: updateCardError } = await supabase
      .from('cards')
      .update({ hours_left: card.hours_left + difference })
      .eq('id', validatedFields.data.cardId)

    if (updateCardError) {
      return {
        status: 'error',
        message: 'An error occurred while updating the card',
      }
    }

    revalidatePath('/cards')
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
    .order('date', { ascending: false })
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
    .order('date', { ascending: false })
    .eq('card_id', cardId)
}
