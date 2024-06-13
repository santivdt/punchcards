'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  console.log('sign in')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('error', error)
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

  console.log('redirecting to dashboard')

  return redirect('/dashboard')
}

export async function signOut() {
  console.log('sign out')
  const supabase = createClient()
  await supabase.auth.signOut()
  console.log('redirecting to home')
  return redirect('/')
}

export const demoSignIn = async () => {
  console.log('demo sign in')
  const supabase = createClient()

  const demoCreds = {
    email: 'demo@demo.email',
    password: 'demopassword',
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: demoCreds.email,
    password: demoCreds.password,
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

  return redirect('/dashboard')
}
