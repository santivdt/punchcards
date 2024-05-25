'use server'

import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export const getClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('clients')
    .select(`name, email`)
    .eq('id', clientId)
    .eq('user_id', user.id)
    .single()
}
