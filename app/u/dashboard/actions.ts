'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { requireUser } from '@/utils/auth'
import { Tables } from '@/types/supabase'

export const getActiveCards = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('cards')
    .select(`id`)
    .eq('is_active', true)
    .eq('user_id', user.id)
}

export const getTotalEarnings = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  const { data: allCards, error: allCardsError } = await supabase
    .from('cards')
    .select(`id, price`)
    .eq('user_id', user.id)

  if (allCardsError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the cards',
    }
  }

  const totalEarnings = allCards.reduce((sum, item) => sum + item.price, 0)

  return { data: totalEarnings }
}

export const getOpenHours = async () => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  const { data: cards, error: cardsError } = await supabase
    .from('cards')
    .select(`id`)
    .eq('is_active', true)
    .eq('user_id', user.id)

  // TODO i do wonder where you will ever see this message?
  if (cardsError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the cards',
    }
  }

  if (cards.length === 0) {
    return { data: 0 }
  }

  const cardIds = cards.map((card) => card.id)

  const { data: hoursData, error: hoursError } = await supabase
    .from('cards')
    .select('hours_left')
    .in('id', cardIds)

  if (hoursError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the hours of the cards',
    }
  }

  const totalHoursLeft = hoursData.reduce(
    (sum, record) => sum + record.hours_left,
    0
  )

  return { data: totalHoursLeft }
}

export type TopClient = {
  id: Tables<'clients'>['id']
  name: Tables<'clients'>['name']
  email: Tables<'clients'>['email']
  totalPrice: number
}

export const getTopClients = async (): Promise<TopClient[]> => {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase.from('cards').select(
    `price, 
      clients (id, name, email)`
  )

  if (error) {
    throw new Error(error.message)
  }
  // MAARTJE HELP TYPESCRIPT MANIA
  const clientTotals: { [key: string]: TopClient } = {}

  data.forEach((item) => {
    const clientId = item.clients?.id ?? ''
    const clientName = item.clients?.name ?? ''
    const clientEmail = item.clients?.email ?? ''
    const price = item.price

    if (!clientTotals[clientId]) {
      clientTotals[clientId] = {
        id: clientId,
        name: clientName,
        email: clientEmail,
        totalPrice: 0,
      }
    }

    clientTotals[clientId].totalPrice += price
  })

  let result = Object.values(clientTotals)

  result.sort((a, b) => b.totalPrice - a.totalPrice)

  result = result.slice(0, 5)

  return result
}
