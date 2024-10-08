'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { createSchema, deleteSchema, updateSchema } from './schema'
import { createReadableId } from '@/utils/index'

const dummyDataCards = [
  '21524a64-9bc7-4d9b-8f48-98cbce929071',
  'a12ebdc7-c6ce-48c4-9a06-de07ac28fa4c',
  '43fc1329-b37c-46ba-8b2f-4b6f84bf0772',
]

export const getCardsFromUser = async () => {
  const supabase = createSupabaseClient()
  return supabase
    .from('cards')
    .select(`*, clients (id,name)`)
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

  const today = new Date()

  if (new Date(validatedFields.data.ends_at) < today) {
    return {
      status: 'error',
      message: 'End date cannot be in the past',
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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.log(profileError)
    return {
      status: 'error',
      message: 'An error occurred while getting the profile',
    }
  }

  const amountOfCards = profile?.amount_of_cards || 0

  const newReadableId = createReadableId(amountOfCards)

  const { error } = await supabase.from('cards').insert({
    user_id: user.id,
    client_id: validatedFields.data.client_id,
    hours: validatedFields.data.hours,
    ends_at: validatedFields.data.ends_at,
    hours_left: validatedFields.data.hours_left,
    is_active: true,
    price: validatedFields.data.price,
    readable_id: newReadableId,
  })

  if (error) {
    return {
      status: 'error',
      message: 'An error occurred while creating the card',
    }
  }

  const { error: updateAmountOfCardsError } = await supabase
    .from('profiles')
    .update({
      amount_of_cards: amountOfCards + 1,
    })
    .eq('id', user.id)

  if (updateAmountOfCardsError) {
    return {
      status: 'error',
      message: 'An error occurred while updating the amount of cards',
    }
  }

  revalidatePath('/cards')

  return {
    status: 'success',
    message: 'Card created successfully',
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
    card_id: formData.get('card_id'),
    price: Number(formData.get('price')),
  })

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  if (dummyDataCards.includes(validatedFields.data.card_id)) {
    return {
      status: 'error',
      message:
        'Cannot update dummy data cards. If you want to test the update function add a new card and update it.',
    }
  }

  const { data: currentCard, error: currentCardError } = await getCardFromId(
    validatedFields.data.card_id
  )

  if (currentCardError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the current card',
    }
  }

  let changeInHours = 0

  if (currentCard.hours) {
    changeInHours = validatedFields.data.hours - currentCard.hours
  }

  const newHoursLeft = currentCard.hours_left + changeInHours

  if (newHoursLeft < 0) {
    return {
      status: 'error',
      message: `It is not possible to have less than 0 hours left on the card.`,
    }
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase
    .from('cards')
    .update({
      hours: validatedFields.data.hours,
      price: validatedFields.data.price,
      hours_left: newHoursLeft,
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
    .select(`*, clients (id, name)`)
    .order('created_at', { ascending: false })
    .eq('client_id', clientId)
}

export const getCardFromId = async (id: string) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('cards')
    .select(`*, clients (id, name, created_at, email, user_id)`)
    .eq('id', id)
    .single()
}

export const getActiveCardsFromUser = async () => {
  const supabase = createSupabaseClient()
  return supabase
    .from('cards')
    .select(`*, clients (*)`)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
}

export const getRecentCardsFromUser = async () => {
  const supabase = createSupabaseClient()

  return supabase
    .from('cards')
    .select(`*, clients (*)`)
    .order('last_updated', { ascending: false })
    .limit(5)
}
