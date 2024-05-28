'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const res = await supabase.auth.initialize()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not complete sign-up of user')
  }

  return redirect(
    '/login?message=You can sign in with the credentials you just created'
  )
}
