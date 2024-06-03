import { Tables } from './supabase'

export interface CardWithClient extends Tables<'cards'> {
  clients: Tables<'clients'> | null
}
