'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export const getHoursFromCard = async (cardId: Tables<'cards'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('hours')
    .select(
      `*, 
      clients (id, name),
      cards(readable_id)`
    )
    .order('created_at', { ascending: false })
    .eq('card_id', cardId)
    .eq('user_id', user.id)
}

export const getCardFromSlug = async (slug: string) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  const { data: cards, error: cardsError } = await supabase
    .from('cards')
    .select(`readable_id, id`)
    .eq('id', slug)
    .eq('user_id', user.id)

  if (cardsError) {
    return {
      status: 'error',
      message: 'An error occurred while getting the card',
    }
  }

  if (cards.length === 0) {
    return {
      status: 'error',
      message: 'No card found',
    }
  }

  return cards[0].readable_id
}
