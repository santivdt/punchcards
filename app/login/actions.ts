'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  if (data?.user?.id && data?.user?.email) {
    const { error: errorLog } = await supabase.from('logs').insert({
      user_id: data.user.id,
      email: data.user.email,
    })

    if (errorLog) {
      console.log('error adding log', errorLog)
    }
  }

  return redirect('/u/dashboard')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
