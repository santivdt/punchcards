'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { requireUser } from '@/utils/auth'

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

  return totalEarnings
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
    return 0
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

  return totalHoursLeft
}
