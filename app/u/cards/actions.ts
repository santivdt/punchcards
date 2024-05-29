'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'

export const getCardsFromUser = async () => {
  const supabase = createSupabaseClient()
  return supabase
    .from('cards')
    .select(
      `
      created_at,
      ends_at,
      hours,
      hours_left,
      readable_id,
      id,
      is_active,
      client_id,
      clients (id,name),
      price,
      user_id
    `
    )
    .limit(10)
    .order('created_at', { ascending: false })
}

export const createCard = async (prevData: any, formData: FormData) => {
  const validatedFields = createSchema.safeParse({
    client_id: formData.get('client_id'),
    hours: Number(formData.get('hours')),
    hours_left: Number(formData.get('hours')),
    price: Number(formData.get('price')),
    ends_at: formData.get('ends_at'),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const { data: activeCards, error: activeCardsError } = await supabase
    .from('cards')
    .select('id')
    .eq('client_id', validatedFields.data.client_id)
    .eq('is_active', true)

  if (activeCardsError) {
    console.error('Error getting active card:', activeCardsError)
  }

  if (activeCards && activeCards.length > 0) {
    return {
      status: 'error',
      message:
        'Client already has an active card. Finish it first before adding a new one.',
    }
  }

  const user = await requireUser()

  const { error } = await supabase.from('cards').insert({
    user_id: user.id,
    client_id: validatedFields.data.client_id,
    hours: validatedFields.data.hours,
    ends_at: validatedFields.data.ends_at,
    hours_left: validatedFields.data.hours_left,
    is_active: true,
    price: validatedFields.data.price,
  })

  if (error) {
    console.log(error)
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

  const dummyDataCards = [
    '43fc1329-b37c-46ba-8b2f-4b6f84bf0772',
    'a12ebdc7-c6ce-48c4-9a06-de07ac28fa4c',
  ]

  if (dummyDataCards.includes(validatedFields.data.card_id)) {
    return {
      status: 'error',
      message:
        'Cannot delete dummy data cards. If you want to test the delete function add a new card and delete it.',
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
    price: Number(formData.get('price')),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase
    .from('cards')
    .update({
      hours: validatedFields.data.hours,
      hours_left: validatedFields.data.hours_left,
      price: validatedFields.data.price,
    })
    .eq('id', validatedFields.data.card_id)

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

export const getCardsFromClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('cards')
    .select(
      `created_at, ends_at, hours, hours_left, readable_id, id, is_active, client_id, price, user_id, 
      clients (id, name)`
    )
    .order('created_at', { ascending: false })
    .eq('client_id', clientId)
}

export const getCardFromSlug = async (slug: string) => {
  const supabase = createSupabaseClient()

  const { data: card, error: cardsError } = await supabase
    .from('cards')
    .select(`readable_id, id`)
    .eq('id', slug)
    .single()

  if (cardsError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the card',
    }
  }

  if (!card) {
    return {
      status: 'error',
      message: 'No card found',
    }
  }

  return card.readable_id
}
