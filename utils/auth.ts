'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const requireUser = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/')
  }

  return user
}

export const useOptionalUser = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return undefined
  }

  return user
}
