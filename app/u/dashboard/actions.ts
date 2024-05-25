'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { requireUser } from '@/utils/auth'

export const getActiveCards = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('cards')
    .select(`id`)
    .eq('is_active', true)
    .eq('user_id', userId)
}

export const getOpenHours = async (userId: Tables<'users'>['id']) => {
  //TODO de vraag is of ik hier userId uit page moet halen of uit hier
  const supabase = createSupabaseClient()
  const user = await requireUser()

  const { data: cards, error: cardsError } = await supabase
    .from('cards')
    .select(`id`)
    .eq('is_active', true)
    .eq('user_id', userId)

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
  console.log('cardIds', cardIds)

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
