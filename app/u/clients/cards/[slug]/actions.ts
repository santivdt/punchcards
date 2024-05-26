'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export const getCardsFromClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('cards')
    .select(
      `created_at, ends_at, hours, hours_left, readable_id, id, is_active, client_id, price, user_id, 
      clients (id, name)`
    )
    .order('created_at', { ascending: false })
    .eq('client_id', clientId)
    .eq('user_id', user.id)
}
