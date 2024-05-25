'use server'
import { Tables } from '@/types/supabase'
import { requireUser } from '@/utils/auth'
import { createClient as createSupabaseClient } from '@/utils/supabase/server'

export const getHoursFromClient = async (clientId: Tables<'clients'>['id']) => {
  const supabase = createSupabaseClient()
  const user = await requireUser()

  return supabase
    .from('hours')
    .select(`*, clients:client_id(id, name)`)
    .eq('client_id', clientId)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
}
