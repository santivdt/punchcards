'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

export const signIn = async (formData: FormData) => {
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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .single()

  if (profileError) {
    return redirect('/login?message=Could not fetch profile')
  }

  if (profile.first_time_login) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })

    if (error) {
      return { error: 'Could not add user to Resend' }
    }

    if (data) {
      const resendId = data.id
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ resend_id: resendId })
    }
  }

  const { error: updateLoginError } = await supabase
    .from('profiles')
    .update({ first_time_login: false })

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

export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/')
}

export const demoSignIn = async () => {
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
