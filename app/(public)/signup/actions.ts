'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const SignupWithOAuth = async (provider: 'google' | 'github') => {
  const supabase = createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/googlesignup`,
    },
  })

  return redirect(data.url!)
}

export const signUp = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
  })

  if (error) {
    return redirect('/signup?message=Could not complete sign-up of user')
  }

  return redirect(
    '/login?message=Check your email to confirm your email address. You can sign in afterwards'
  )
}
