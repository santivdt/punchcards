'use server'

import { Tables } from '@/types/supabase'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export const getCardsFromUser = async (userId: Tables<'users'>['id']) => {
  const supabase = createSupabaseClient()

  return supabase
    .from('cards')
    .select(
      `created_at, ends_at, hours, hours_left, readable_id, id, is_active, clients:client_id(*)`
    )
    .limit(10)
    .order('created_at', { ascending: false })
    .eq('user_id', userId)
}
