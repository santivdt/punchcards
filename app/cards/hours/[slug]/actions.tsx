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
      clients:client_id(id, name),
      cards:card_id(readable_id)`
    )
    .order('created_at', { ascending: false })
    .eq('card_id', cardId)
    .eq('user_id', user.id)
}
