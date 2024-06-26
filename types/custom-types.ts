import { Tables } from './supabase'

export interface CardWithClient extends Tables<'cards'> {
  clients: Tables<'clients'> | null
}

export type ErrorType = string | undefined | null

export type TopClient = {
  id: Tables<'clients'>['id']
  name: Tables<'clients'>['name']
  email: Tables<'clients'>['email']
  totalPrice: number
}
